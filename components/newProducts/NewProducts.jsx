import './newProducts.scss'
import Center from '../center/Center'
import ProductsFlex from '../productsFlex/ProductsFlex'

export default function NewProducts({products}) {
  
  return (
    <Center>
      <h2 className="title">New Arrivals</h2>
      <ProductsFlex products={products} /> 
    </Center>
  )
}