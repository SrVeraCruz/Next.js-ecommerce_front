import Link from 'next/link'
import Button from '../primaryBtn/Button'
import './productBox.scss'
import { useContext } from 'react'
import { CartContext } from '../cartContext/CartContext'

export default function ProductBox(
  {
    _id,
    title,
    description,
    price,
    images
  }
){
  const url = '/products/'+_id

  const { addProduct } = useContext(CartContext)

  return (
    <div className='productWrapper'>
      <Link href={url} className="whiteBox">
        <img src={images[0]} alt={title} />
      </Link>
      <div className="infoBox">
        <Link href={url} className='title'>{title}</Link>
        <div className="priceRow">
          <div className='price'>
            <span>${price}</span>
          </div>
          <div>
            <Button 
              onClick={() => addProduct(_id)}
              primary
              outline
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}