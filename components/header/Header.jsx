import "./header.scss"
import Center from "../center/Center"
import Link from "next/link"
import { useContext, useState } from "react"
import { CartContext } from "../cartContext/CartContext"
import BarIcon from "../barIcon/BarIcon"

export default function Header() {
  const {cartProducts} = useContext(CartContext)
  const [navActive,setNavIsActive] = useState(false)

  return (
    <header className="header">
      <Center>
        <div className="wrapper">
          <Link className="logo" href={'/'}>E-commerce</Link>
          <nav className={navActive ? "nav active" : "nav" }>
            <Link href={'/'}>Home</Link>
            <Link href={'/products'}>All products</Link>
            <Link href={'#'}>Categories</Link>
            <Link href={'#'}>Account</Link>
            <Link href={'/cart'}>Cart ({cartProducts?.length || 0})</Link>
          </nav>
          <button 
            onClick={() => setNavIsActive(prev => !prev)}
            className="navIcon"
          >
            <BarIcon />
          </button>
        </div>
      </Center>
    </header>  
  )
}