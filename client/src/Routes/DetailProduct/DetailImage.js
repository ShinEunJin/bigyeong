import React, { useEffect, useState } from "react"
import ImageGallery from "react-image-gallery"
import dotenv from "dotenv"

dotenv.config()

const prod = process.env.NODE_ENV === "production"
const dev = process.env.NODE_ENV === "development"

function DetailImage(props) {
  const [imageState, setImageState] = useState([])

  useEffect(() => {
    if (
      props.product &&
      props.product.images &&
      props.product.images.length > 0
    ) {
      let newImages = []
      props.product.images.map((item) =>
        newImages.push({
          original:
            (prod && `${item}`) || (dev && `http://localhost:5000/${item}`),
          thumbnail:
            (prod && `${item}`) || (dev && `http://localhost:5000/${item}`),
        })
      )
      setImageState(newImages)
    }
  }, [props.product])

  return (
    <div>
      <ImageGallery items={imageState} />
    </div>
  )
}

export default DetailImage
