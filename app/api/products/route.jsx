import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../lib/mongoose";
import { Product } from "../../../models/Products"

export async function GET(req) {
  mongooseConnect();

  const url = new URL(req.url)
  const id = url.searchParams.get('id')

  if(id && id != '') {
    const productDoc = await Product.findById(id)
    return NextResponse.json(productDoc)
  } else {
    const productDoc = await Product.find(
      {}, null, {sort: {'_id':-1}, limit:10}
    )
    return NextResponse.json(productDoc)
  }
}