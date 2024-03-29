import "./featured.scss"
import Center from "../center/Center";
import Button from "../primaryBtn/Button";
import Link from "next/link";
import CartIcon from "../cartIcon/CartIcon";

export default function Featured({product}) {

  return (
    <div className="featured">
      <Center>
        <div className="columsWrapper">
          <div className="box">
            <div>
              <h1>{product?.title}</h1>
              <p>{product?.description}</p>
              <div className="buttonsWrapper">
                <Button 
                  outline="outline" 
                  white="white" 
                >
                  <Link href={'/products/'+product?._id}>
                    Read more
                  </Link>
                </Button>
                <Button 
                  white="white" 
                >
                  <CartIcon />
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
          <div className="box">
            <img src={product?.images[0]} alt={product?.title} />
          </div>
        </div>
      </Center>
    </div>  
  )
}