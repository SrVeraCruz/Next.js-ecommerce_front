import Link from 'next/link'
import Button from '../primaryBtn/Button'
import './productBox.scss'

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
              primary="primary"
              outline="outline"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}