import './productsFlex.scss'
import ProductBox from '../productBox/ProductBox'

export default function ProductsFlex({products}) {
  return (
    <div className="newProducts">
      {!!products && products.map((product) => (
        <ProductBox key={product._id} {...product}/>
      ))}
    </div>
  )
}