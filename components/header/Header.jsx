import "./header.scss"
import Center from "../center/Center"
import Link from "next/link"
import { useContext } from "react"
import { CartContext } from "../cartContext/CartContext"

export default function Header() {
  const {cartProducts} = useContext(CartContext)

  return (
    <header className="header">
      <Center>
        <div className="wrapper">
          <Link className="logo" href={'/'}>E-commerce</Link>
          <nav className="nav">
            <Link href={'/'}>Home</Link>
            <Link href={'/products'}>All products</Link>
            <Link href={'/categories'}>Categories</Link>
            <Link href={'/account'}>Account</Link>
            <Link href={'/cart'}>Cart ({cartProducts?.length})</Link>
          </nav>
        </div>
      </Center>
    </header>  
  )
}