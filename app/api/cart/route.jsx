import { mongooseConnect } from "../../../lib/mongoose";
import { Product } from "../../../models/Products";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json()
  const { ids } = data
  await mongooseConnect()

  const productsInfos = await Product.find({_id:ids})

  return NextResponse.json(productsInfos)
}