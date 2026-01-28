import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const transactionId = searchParams.get('transactionId')

    console.log('[v0] Checking payment for transaction:', transactionId)

    if (!transactionId) {
      return NextResponse.json(
        { success: false, error: 'Transaction ID is required' },
        { status: 400 }
      )
    }

    const apiToken = 'NAunRlhzYsXferc1lQGzMZBvBsVR4RhqOkddXaY7NYb3Iz9nQiEzkzlVJM12'
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    
    const url = `https://api.disruptybr.com.br/api/public/v1/transactions/${transactionId}?api_token=${apiToken}`
    
    console.log('[v0] Fetching from URL:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    console.log('[v0] Response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[v0] API Error - Status:', response.status)
      console.error('[v0] API Error - Body:', errorText)
      
      if (response.status === 404) {
        console.log('[v0] Transaction not found - may indicate wrong ID format or transaction not yet available')
        return NextResponse.json({
          success: true,
          status: 'waiting_payment',
          paid: false,
          debug: 'transaction_not_found'
        })
      }
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to check payment status',
          debug: errorText 
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    console.log('[v0] Payment status response:', data)

    const paymentStatus = data.payment_status

    return NextResponse.json({
      success: true,
      status: paymentStatus,
      paid: paymentStatus === 'paid',
    })
  } catch (error) {
    console.error('[v0] Error checking payment:', error)
    return NextResponse.json({
      success: true,
      status: 'waiting_payment',
      paid: false,
    })
  }
}
