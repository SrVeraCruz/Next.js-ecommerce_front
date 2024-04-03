'use client'

import "./page.scss"
import Featured from "../components/featured/Featured";
import Header from "../components/header/Header";
import NewProducts from "../components/newProducts/NewProducts";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [featuredProduct,setFeaturedProdut] = useState(null)
  const [newProducts,setNewProduts] = useState([])

  const fetchFeaturedProduct = async () => {
    const featuredProductId = '6605a063d21b6c3405acdace';
    
    await axios.get('/api/products?id='+featuredProductId)
      .then((res) => {setFeaturedProdut(res.data)})
      .catch((err) => {console.error(err.message)})
  }

  const fetchNewProducts = async () => {
    await axios.get('/api/products')
      .then((res) => {setNewProduts(res.data)})
      .catch((err) => {console.error(err.message)})
  }



  useEffect(() => {
    fetchFeaturedProduct()
    fetchNewProducts()
  }, [])

  return (
    <div className="app">
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}