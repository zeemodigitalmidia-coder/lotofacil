import { NextResponse } from 'next/server'
import QRCode from 'qrcode'

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
  
  return [...cpfBase, digit1, digit2].join('')
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
    const { name, email, utmParams } = await request.json()

    console.log('[v0] Received data:', { name, email, utmParams })

    // Gerar dados aleatórios para customer
    const cpf = generateCPF()
    const phone = generatePhone()

    console.log('[v0] Generated customer data:', { cpf, phone })

    // Payload para API Disrupty
    const payload = {
      amount: 4990, // R$ 49,90 em centavos
      offer_hash: 'f5mcg4mg6x',
      payment_method: 'pix',
      customer: {
        name: name,
        email: email,
        phone_number: phone,
        document: cpf,
      },
      cart: [
        {
          product_hash: 'uiwy49nksz',
          title: 'I.A LOTO PREMIADA',
          price: 4990,
          quantity: 1,
          operation_type: 1,
          tangible: false,
        },
      ],
      installments: 1,
      expire_in_days: 1,
      tracking: utmParams || {},
    }

    console.log('[v0] Sending to Disrupty API:', payload)

    // Chamada para API Disrupty
    const apiToken = 'NAunRlhzYsXferc1lQGzMZBvBsVR4RhqOkddXaY7NYb3Iz9nQiEzkzlVJM12'
    const response = await fetch(
      `https://api.disruptybr.com.br/api/public/v1/transactions?api_token=${apiToken}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )

    const data = await response.json()
    
    console.log('[v0] Disrupty API response:', data)

    if (data.pix && data.pix.pix_qr_code) {
      let qrCodeBase64 = null
      
      try {
        // Gera QR Code em base64 a partir do código PIX textual
        const qrCodeDataUrl = await QRCode.toDataURL(data.pix.pix_qr_code, {
          errorCorrectionLevel: 'M',
          type: 'image/png',
          width: 300,
          margin: 1,
        })
        
        // Remove o prefixo "data:image/png;base64," para obter apenas o base64
        qrCodeBase64 = qrCodeDataUrl.replace(/^data:image\/png;base64,/, '')
        
        console.log('[v0] QR Code generated successfully')
      } catch (qrError) {
        console.error('[v0] Error generating QR Code:', qrError)
      }

      return NextResponse.json({
        success: true,
        data: {
          pixCode: data.pix.pix_qr_code,
          pixQRCode: qrCodeBase64, // Base64 gerado no backend
          amount: 49.90,
          transactionId: data.id,
          hash: data.hash,
        },
      })
    } else {
      console.error('[v0] Payment creation failed:', data)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Falha ao criar pagamento',
          details: data 
        },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('[v0] Error in create-pix:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
