import "./header.scss"
import Center from "../center/Center"
import Link from "next/link"

export default function Header() {
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
            <Link href={'/cart'}>Cart (0)</Link>
          </nav>
        </div>
      </Center>
    </header>  
  )
}