import { NextRequest, NextResponse } from 'next/server'

const UTMIFY_API_URL = 'https://api.utmify.com.br/api-credentials/orders'
const UTMIFY_API_TOKEN = '1s3KPRnm0QUXZyjlk369WFppqh6ultUYR3Os'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      orderId,
      status,
      createdAt,
      approvedDate,
      buyer,
      product,
      offer,
      amount,
      tracking,
    } = body

    const clientIp = 
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      '127.0.0.1'

    console.log('[v0] Using IP for Utmify:', clientIp)

    // Format dates to UTC format required by Utmify (YYYY-MM-DD HH:MM:SS)
    const formatDateToUTC = (date: Date | string | null) => {
      if (!date) return null
      const d = new Date(date)
      const year = d.getUTCFullYear()
      const month = String(d.getUTCMonth() + 1).padStart(2, '0')
      const day = String(d.getUTCDate()).padStart(2, '0')
      const hours = String(d.getUTCHours()).padStart(2, '0')
      const minutes = String(d.getUTCMinutes()).padStart(2, '0')
      const seconds = String(d.getUTCSeconds()).padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

    // Calculate commission (assuming 3% gateway fee for PIX + R$ 1,00)
    const totalInCents = amount
    const gatewayFeeInCents = Math.round(totalInCents * 0.03) + 100 // 3% + R$ 1,00
    const userCommissionInCents = totalInCents - gatewayFeeInCents

    // Prepare payload for Utmify API
    const utmifyPayload = {
      orderId: orderId,
      platform: 'LotoPremiada',
      paymentMethod: 'pix',
      status: status, // 'waiting_payment' | 'paid' | 'refused' | 'refunded' | 'chargedback'
      createdAt: formatDateToUTC(createdAt),
      approvedDate: status === 'paid' && approvedDate ? formatDateToUTC(approvedDate) : null,
      refundedAt: null,
      customer: {
        name: buyer.name,
        email: buyer.email,
        phone: buyer.phone || null,
        document: buyer.document || null,
        country: 'BR',
        ip: clientIp,
      },
      products: [
        {
          id: product.id,
          name: product.name,
          planId: offer.id || null,
          planName: offer.name || null,
          quantity: offer.quantity || 1,
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
        currency: 'BRL',
      },
      isTest: false,
    }

    console.log('[v0] Sending to Utmify:', JSON.stringify(utmifyPayload, null, 2))

    // Send to Utmify API
    const response = await fetch(UTMIFY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': UTMIFY_API_TOKEN,
      },
      body: JSON.stringify(utmifyPayload),
    })

    const responseText = await response.text()
    
    console.log('[v0] Utmify raw response:', {
      status: response.status,
      statusText: response.statusText,
      body: responseText
    })

    if (!response.ok) {
      console.error('[v0] Utmify API error:', responseText)
      return NextResponse.json(
        { 
          error: 'Erro ao enviar para Utmify', 
          details: responseText,
          status: response.status 
        },
        { status: response.status }
      )
    }

    console.log('[v0] Utmify success for order:', orderId, 'status:', status)

    return NextResponse.json({ 
      success: true, 
      message: 'Dados enviados para Utmify com sucesso',
      response: responseText 
    })
  } catch (error) {
    console.error('[v0] Error sending to Utmify:', error)
    return NextResponse.json(
      { error: 'Erro interno ao enviar para Utmify' },
      { status: 500 }
    )
  }
}
