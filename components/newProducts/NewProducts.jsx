import Center from '../center/Center'
import ProductBox from '../productBox/ProductBox'
import './newProducts.scss'

export default function NewProducts({products}) {
  
  return (
    <Center>
      <h2 className="title">New Arrivals</h2>
      <div className="newProducts">
        {!!products && products.map((product) => (
          <ProductBox {...product}/>
        ))}
      </div>  
    </Center>
  )
}