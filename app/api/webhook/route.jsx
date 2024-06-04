import { NextResponse } from 'next/server'
import Stripe from 'stripe';
import { Order } from '../../../models/Orders';


export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SK)
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

  const sig = req.headers.get('stripe-signature')
  const bodyText = await req.text();
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      bodyText, 
      sig, 
      endpointSecret
    );
  } catch (err) {
    console.log('error: '+err.message)
    return NextResponse.json(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid'

      if(orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {paid:true})
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json(200)
}