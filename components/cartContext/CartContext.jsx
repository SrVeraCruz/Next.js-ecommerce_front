import{ createContext, useEffect, useState } from "react"

export const CartContext = createContext({});

export function CartContextProvider({children}) {
  const [cartProducts,setCartProducts] = useState([])

  useEffect(() => {
    if(window !== 'undefined'){
      if(cartProducts?.length) {
        localStorage.setItem("cart", JSON.stringify(cartProducts))
      }
    }
  }, [cartProducts])

  useEffect(() => {
    if(window !== 'undefined') {
      const cart = localStorage.getItem("cart")
      if(cart ) {
        setCartProducts(JSON.parse(localStorage.getItem("cart")))
      }
    }
  }, [])

  const addProduct = (productId) => {
    if(!productId) {
      return
    }
    setCartProducts(prev => [...prev,productId])
  }

  const removedProduct = (productId) => {
    if(!productId) {
      return
    }

    setCartProducts(prev => {
      const pos = prev.indexOf(productId)
      if(pos !== -1) {
        return [...prev].filter((value,index) => {
          return index !== pos
        })
      }
      return prev
    })
  }

  return (
    <CartContext.Provider 
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removedProduct
      }} 
    >
      {children}
    </CartContext.Provider>  
  )
}