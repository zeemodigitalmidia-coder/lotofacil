import { NextResponse } from "next/server"
import QRCode from "qrcode"

// Função auxiliar para gerar CPF válido
function generateCPF(): string {
  const randomDigit = () => Math.floor(Math.random() * 10)

  // Gera os 9 primeiros dígitos
  const cpfBase = Array.from({ length: 9 }, randomDigit)

  // Calcula primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += cpfBase[i] * (10 - i)
  }
  let digit1 = 11 - (sum % 11)
  digit1 = digit1 >= 10 ? 0 : digit1

  // Calcula segundo dígito verificador
  sum = 0
  for (let i = 0; i < 9; i++) {
    sum += cpfBase[i] * (11 - i)
  }
  sum += digit1 * 2
  let digit2 = 11 - (sum % 11)
  digit2 = digit2 >= 10 ? 0 : digit2

  return [...cpfBase, digit1, digit2].join("")
}

// Função auxiliar para gerar telefone válido
function generatePhone(): string {
  const ddd = Math.floor(Math.random() * 89) + 11 // DDD entre 11 e 99
  const prefix = 9
  const number = Math.floor(Math.random() * 90000000) + 10000000 // 8 dígitos
  return `${ddd}${prefix}${number}`
}

export async function POST(request: Request) {
  try {
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error("[v0] Error parsing request body:", parseError)
      return NextResponse.json({ error: "Dados inválidos enviados" }, { status: 400 })
    }

    const { customerName, customerEmail, amount, productName, offerId, offerName, tracking } = body

    if (!customerName || !customerEmail || !amount) {
      console.error("[v0] Missing required fields:", { customerName, customerEmail, amount })
      return NextResponse.json({ error: "Nome, email e valor são obrigatórios" }, { status: 400 })
    }

    console.log("[v0] Checkout request received:", { customerName, customerEmail, amount })
    console.log("[v0] Tracking data received:", tracking)

    // Gerar dados aleatórios para customer
    const cpf = generateCPF()
    const phone = generatePhone()

    console.log("[v0] Generated customer data:", { cpf, phone })

    // Payload para API Disrupty
    const payload = {
      amount: Math.round(amount), // Valor em centavos
      offer_hash: "f5mcg4mg6x",
      payment_method: "pix",
      customer: {
        name: customerName,
        email: customerEmail,
        phone_number: phone,
        document: cpf,
      },
      cart: [
        {
          product_hash: "uiwy49nksz",
          title: productName || "I.A LOTO PREMIADA",
          price: Math.round(amount),
          quantity: 1,
          operation_type: 1,
          tangible: false,
        },
      ],
      installments: 1,
      expire_in_days: 1,
      tracking: {
        src: tracking?.src || null,
        sck: tracking?.sck || null,
        utm_source: tracking?.utm_source || null,
        utm_campaign: tracking?.utm_campaign || null,
        utm_medium: tracking?.utm_medium || null,
        utm_content: tracking?.utm_content || null,
        utm_term: tracking?.utm_term || null,
      },
    }

    console.log("[v0] Sending to Disrupty API with tracking:", payload.tracking)

    const apiToken = "NAunRlhzYsXferc1lQGzMZBvBsVR4RhqOkddXaY7NYb3Iz9nQiEzkzlVJM12"

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    let response
    try {
      response = await fetch(`https://api.disruptybr.com.br/api/public/v1/transactions?api_token=${apiToken}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
    } catch (fetchError) {
      clearTimeout(timeoutId)
      console.error("[v0] Network error calling Disrupty:", fetchError)
      return NextResponse.json({ error: "Erro de conexão. Verifique sua internet e tente novamente." }, { status: 503 })
    } finally {
      clearTimeout(timeoutId)
    }

    const contentType = response.headers.get("content-type")
    let data

    if (contentType && contentType.includes("application/json")) {
      data = await response.json()
    } else {
      // Se a resposta não for JSON, lê como texto
      const text = await response.text()
      console.error("[v0] Non-JSON response from Disrupty:", text.substring(0, 200))
      return NextResponse.json(
        {
          error: "Erro no sistema de pagamento. Tente novamente em alguns segundos.",
        },
        { status: 500 },
      )
    }

    console.log("[v0] Disrupty API response status:", response.status)

    if (response.ok && data.pix && data.pix.pix_qr_code) {
      let qrCodeBase64 = null

      try {
        // Gera QR Code em base64 a partir do código PIX textual
        const qrCodeDataUrl = await QRCode.toDataURL(data.pix.pix_qr_code, {
          errorCorrectionLevel: "M",
          type: "image/png",
          width: 300,
          margin: 1,
        })

        // Remove o prefixo "data:image/png;base64," para obter apenas o base64
        qrCodeBase64 = qrCodeDataUrl.replace(/^data:image\/png;base64,/, "")

        console.log("[v0] QR Code generated successfully")
      } catch (qrError) {
        console.error("[v0] Error generating QR Code:", qrError)
        return NextResponse.json({ error: "Erro ao gerar QR Code. Tente novamente." }, { status: 500 })
      }

      console.log("[v0] Full Disrupty response data:", {
        id: data.id,
        hash: data.hash,
        status: data.status,
        payment_status: data.payment_status,
      })

      const utmifyTransactionId = data.hash || data.id
      console.log("[v0] Sending pending status to UTMify for transaction:", utmifyTransactionId)

      try {
        const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1"

        const formatDateToUTC = (date: Date | string | null) => {
          if (!date) return null
          const d = new Date(date)
          const year = d.getUTCFullYear()
          const month = String(d.getUTCMonth() + 1).padStart(2, "0")
          const day = String(d.getUTCDate()).padStart(2, "0")
          const hours = String(d.getUTCHours()).padStart(2, "0")
          const minutes = String(d.getUTCMinutes()).padStart(2, "0")
          const seconds = String(d.getUTCSeconds()).padStart(2, "0")
          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
        }

        const totalInCents = amount
        const gatewayFeeInCents = Math.round(totalInCents * 0.03) + 100
        const userCommissionInCents = totalInCents - gatewayFeeInCents

        const utmifyPayload = {
          orderId: utmifyTransactionId,
          platform: "LotoPremiada",
          paymentMethod: "pix",
          status: "waiting_payment",
          createdAt: formatDateToUTC(new Date()),
          approvedDate: null,
          refundedAt: null,
          customer: {
            name: customerName,
            email: customerEmail,
            phone: null,
            document: null,
            country: "BR",
            ip: clientIp,
          },
          products: [
            {
              id: "uiwy49nksz",
              name: productName || "I.A LOTO PREMIADA",
              planId: offerId || "f5mcg4mg6x",
              planName: offerName || "I.A LOTO PREMIADA",
              quantity: 1,
              priceInCents: amount,
            },
          ],
          trackingParameters: {
            src: tracking?.src || null,
            sck: tracking?.sck || null,
            utm_source: tracking?.utm_source || null,
            utm_campaign: tracking?.utm_campaign || null,
            utm_medium: tracking?.utm_medium || null,
            utm_content: tracking?.utm_content || null,
            utm_term: tracking?.utm_term || null,
          },
          commission: {
            totalPriceInCents: totalInCents,
            gatewayFeeInCents: gatewayFeeInCents,
            userCommissionInCents: userCommissionInCents,
            currency: "BRL",
          },
          isTest: false,
        }

        console.log("[v0] Sending to Utmify with tracking parameters:", utmifyPayload.trackingParameters)

        const utmifyResponse = await fetch("https://api.utmify.com.br/api-credentials/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-token": "1s3KPRnm0QUXZyjlk369WFppqh6ultUYR3Os",
          },
          body: JSON.stringify(utmifyPayload),
        })

        const utmifyData = await utmifyResponse.text()
        console.log("[v0] UTMify response:", {
          status: utmifyResponse.status,
          body: utmifyData,
        })

        if (!utmifyResponse.ok) {
          console.error("[v0] UTMify pending notification failed:", utmifyData)
        }
      } catch (utmifyError) {
        console.error("[v0] Error sending pending status to UTMify:", utmifyError)
        // Don't fail the checkout if UTMify fails - transaction is already created
      }

      return NextResponse.json({
        pixCode: data.pix.pix_qr_code,
        pixQRCode: qrCodeBase64,
        amount: amount,
        externalId: data.hash || data.id,
        transactionHash: data.hash,
        createdAt: new Date().toISOString(),
        buyer: {
          name: customerName,
          email: customerEmail,
        },
        product: {
          name: productName || "I.A LOTO PREMIADA",
          offerId: offerId,
          offerName: offerName,
        },
        tracking: tracking || {},
      })
    } else {
      console.error("[v0] Payment creation failed:", data)
      const errorDetail = data?.errors?.[0]?.detail || data?.message || data?.error || "Erro desconhecido"
      return NextResponse.json(
        {
          error: `Falha ao criar pagamento: ${errorDetail}`,
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("[v0] Error in checkout:", error)
    const errorMessage = error instanceof Error ? error.message : "Erro interno"
    return NextResponse.json(
      {
        error: `Erro ao processar: ${errorMessage}`,
      },
      { status: 500 },
    )
  }
}
