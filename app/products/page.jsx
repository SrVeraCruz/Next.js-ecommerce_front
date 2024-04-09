'use client'

import Center from "../../components/center/Center";
import Header from "../../components/header/Header";
import axios from 'axios'
import { useEffect, useState } from 'react';
import ProductsFlex from '../../components/productsFlex/ProductsFlex';
import Title from '../../components/title/Title'

export default function ProductsPage() {
  const [products,setProducts] = useState([])

  const fetchProducts = async () => {
    await axios.get('/api/products?all=1')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err.message))
  }

  useEffect(() => {
    fetchProducts()
  }, [])
  
  return (
    <div className="products">
      <Header />
      <Center>
        <Title>
          All Products
        </Title>
        <ProductsFlex products={products} />
      </Center>
    </div>
  )
}