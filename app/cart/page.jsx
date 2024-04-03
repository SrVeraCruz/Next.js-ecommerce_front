"use client"

import "./cart.scss"
import Center from "../../components/center/Center";
import Header from "../../components/header/Header";
import Button from "../../components/primaryBtn/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../components/cartContext/CartContext";
import axios from "axios";
import Table from "../../components/table/Table";
import Input from "../../components/input/Input";

export default function Cart() {
  const { 
    cartProducts, 
    addProduct, 
    removedProduct 
  } = useContext(CartContext)

  const [loading, setLoading] = useState(false);
  const [products,setProducts] = useState([])
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [city,setCity] = useState("")
  const [postalCode,setPostalCode] = useState("")
  const [streetAddress,setStreetAddress] = useState("")
  const [country,setCountry] = useState("")

  const fetchCartProducts = async () => {
    setLoading(true);
    await axios.post('/api/cart',{ids:cartProducts})
      .then(res => setProducts(res.data))
      .catch(err => {console.error(err.message)}) 
    setLoading(false);
  }
  
  useEffect(() => {
    if(cartProducts.length) {
      fetchCartProducts()
    }
  }, [cartProducts])

  const goToPayment = async (e) => {
    e.preventDefault()
    const data = {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      productsIds:cartProducts
    }

    await axios.post('/api/checkout',data)
      .then(res => {
        if (res.data.url) {
          window.location = res.data.url
        }
      })
      .catch(err => console.error(err.message))
  }

  const moreOfThisProduct = (productId) => {
    addProduct(productId)
  }

  const lessOfThisProduct = (productId) => {
    removedProduct(productId)
  }

  let total = 0
  if(cartProducts.length && products.length) {
    for(const productId of cartProducts) {
      const price = products.find(
        product => product._id === productId
      )?.price || 0

      total += price
    }
  }

  if(window.location.href.includes("success")) {
    return (
      <>
        <div className="cart">
          <Header />
          <Center>
            <div className="columsWrapper">
              <div className="box">
                <h2 className="title">Thanks for your order!</h2>
                <p>We will email you when your order will be send.</p>
              </div>
            </div>
          </Center>
        </div>
      </>
    )
  }
  
  return (
    <div className="cart">
      <Header />
      <Center>
        <div className="columsWrapper">
          <div className="box">
            <h2 className="title">Cart</h2>
            {loading && <div>Loading...</div>}
            {!loading && !!!cartProducts?.length && (
              <div>Your cart is empty</div>  
            )}
            {!loading && !!products.length && (
              <>
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>  
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!!products && products.map((product,key) => (
                      <tr key={key}>
                        <td className="productInfoCell">
                          <div className="productImageBox">
                            <img src={product.images[0]} alt={product.title} />
                          </div>
                          <p>{product.title}:</p>  
                        </td> 
                        <td className="productQte">
                          <div>
                            <Button
                              onClick={()=> lessOfThisProduct(product._id)}
                            >
                              -
                            </Button>
                            <span>
                              {cartProducts.filter(
                                  id => id === product._id
                                ).length
                              }
                            </span>
                            <Button 
                              onClick={()=> moreOfThisProduct(product._id)}
                            > 
                              + 
                            </Button>
                          </div>                          
                        </td>
                        <td>
                          <span className="price">
                            ${cartProducts.filter(
                                id => id === product._id
                              ).length * product.price
                            }
                          </span>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td>
                        <span className="price">
                          Total:
                        </span>
                      </td>
                      <td></td>
                      <td>
                        <span className="price">
                          ${total}
                        </span>
                      </td>

                    </tr>
                  </tbody>
                </Table>
              </>
            )}
          </div>
          {!!cartProducts?.length && (
            <div className="box">
              <h2 className="title">Order information</h2>
              <form onSubmit={goToPayment}>
                <Input 
                  type="text" 
                  placeholder="Name" 
                  value={name}
                  name="name"
                  onChange={e => setName(e.target.value)}
                />
                <Input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  name="email"
                  onChange={e => setEmail(e.target.value)}
                />
                <Input 
                  type="text" 
                  placeholder="City" 
                  value={city}
                  name="city"
                  onChange={e => setCity(e.target.value)}
                />
                <div className="cityHolder">
                  <Input 
                    type="text" 
                    placeholder="Postal Code" 
                    value={postalCode}
                    name="postalCode"
                    onChange={e => setPostalCode(e.target.value)}
                  />
                  <Input 
                    type="text" 
                    placeholder="Street Address" 
                    value={streetAddress}
                    name="streetAddress"
                    onChange={e => setStreetAddress(e.target.value)}
                  />
                </div>
                <Input 
                  type="text" 
                  placeholder="country"
                  value={country}
                  name="country"
                  onChange={e => setCountry(e.target.value)} 
                />
                {/* <input 
                  type="hidden" 
                  value={cartProducts.join(',')} 
                  name="products"
                  /> */}
                <Button
                  type="submit"
                  black
                  block
                  >
                  Continue to payment
                </Button>
              </form>
            </div>
          )}
        </div>
      </Center>
    </div>
  )
}