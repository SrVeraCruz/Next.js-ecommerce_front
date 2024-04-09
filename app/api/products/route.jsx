import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../lib/mongoose";
import { Product } from "../../../models/Products"

export async function GET(req) {
  mongooseConnect();

  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  const all = url.searchParams.get('all')

  let productDoc;
  if(id && id != '') {
    productDoc = await Product.findById(id)
  } else if(all && all === '1') {
    productDoc = await Product.find({}, null, {sort: {'_id':-1}});
  } else {
    productDoc = await Product.find(
      {}, null, {sort: {'_id':-1}, limit:10}
    )
  }
  return NextResponse.json(productDoc)
}