import{ createContext, useEffect, useState } from "react"

export const CartContext = createContext({});

export function CartContextProvider({children}) {
  const ls = typeof window !== 'undefined' ? window.localStorage : null
  const [cartProducts,setCartProducts] = useState([])

  useEffect(() => {
    if(ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")))
    }
  }, [])
  
  useEffect(() => {
    if(ls && cartProducts){
      ls.setItem("cart", JSON.stringify(cartProducts))
    }
  }, [cartProducts])


  const addProduct = (productId) => {
    if(!productId) {
      return
    }
    // if(!cartProducts){
    //   setCartProducts([])
    // }
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

  const clearCart = () => {
    setCartProducts([])
  }

  return (
    <CartContext.Provider 
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removedProduct,
        clearCart,
      }} 
    >
      {children}
    </CartContext.Provider>  
  )
}