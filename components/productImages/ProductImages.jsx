import { useState } from 'react'
import './productImages.scss'

export default function ProductImages({images}) {
  const [activeImageIndex,setActiveImageIndex] = useState(0)
  const active = 'imageButton active '

  return (
    <>
      <div className="images">
        <img src={images?.[activeImageIndex]} alt={images?.title} />
        <div className="imagesButton">
          {images?.map((img,key) => (
            <div 
              key={key} 
              className={activeImageIndex === key 
                ? active 
                : 'imageButton'
              }
              onClick={()=> setActiveImageIndex(
                images.indexOf(img)
              )}
            >
              <img src={img} alt="" />
            </div>
          ))}
        </div>
      </div>

    </>
  )
}