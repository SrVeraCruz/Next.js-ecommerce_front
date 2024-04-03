import { mongooseConnect } from "../../../lib/mongoose";
import { Order } from "../../../models/Orders";
import { Product } from "../../../models/Products";
import { NextResponse } from "next/server";
import Stripe from "stripe"


export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SK);

  const data = await  req.json()
  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    productsIds,
  } = data
  
  await mongooseConnect()
  const uniqueIds = [...new Set(productsIds)]
  const productsInfos = await Product.find({_id:uniqueIds})

  const line_items = []
  for(const productId of uniqueIds) {
    const productInfo = productsInfos.find(p => p._id.toString() === productId)
    const quantity = productsIds.filter(id => id === productId)?.length || 0
    line_items.push({
      quantity,
      price_data: {
        currency: 'USD',
        product_data: {name: productInfo?.title},
        unit_amount: productInfo?.price * 100
      }
    })
  }

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid:false,
  })

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
    cancel_url: `${process.env.PUBLIC_URL}/cart?cancel=1`,
    metadata: {orderId: orderDoc._id.toString()},
  })

  return NextResponse.json({
    url:session?.url
  })
}