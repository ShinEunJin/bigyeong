import React, { useEffect, useState } from "react"
import ImageGallery from "react-image-gallery"
import dotenv from "dotenv"
dotenv.config()

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
          original: process.env.REACT_APP_DEV_PORT + `/${item}`,
          thumbnail: process.env.REACT_APP_DEV_PORT + `/${item}`,
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
