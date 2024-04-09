'use client'

import './product.scss'
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Center from "../../../components/center/Center"
import Header from "../../../components/header/Header"
import Title from "../../../components/title/Title"
import ProductImages from "../../../components/productImages/ProductImages"
import Button from '../../../components/primaryBtn/Button'
import CartIcon from '../../../components/cartIcon/CartIcon'
import { CartContext } from '../../../components/cartContext/CartContext'

export default function ProductPage({params}) {
  const { productId } = params
  const { addProduct } = useContext(CartContext)
  const [productInfo,setProductInfo] = useState(undefined)

  const fetchProduct = async () => {
    await axios.get('/api/products?id='+productId)
      .then(res => setProductInfo(res.data))
      .catch(err => console.error(err.data))
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <>
      <Header />
      <Center>
        <div className="colWrapper">
          <div className="box">
            <ProductImages images={productInfo?.images}/>
          </div>
          <div className="box">
            <Title>{productInfo?.title}</Title>
            <p>{productInfo?.description}</p>
            <div className='price'>
              <span>${productInfo?.price}</span>
              <Button 
                primary
                onClick={()=> addProduct(productInfo?._id)}
              >
                <CartIcon />
                Add to cart
              </Button>

            </div>
          </div>
        </div>
      </Center>
    </>
  )
}