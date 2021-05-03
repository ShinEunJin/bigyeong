import React from "react"
import { Carousel } from "antd"
import dotenv from "dotenv"
dotenv.config()

function ImageSlider(props) {
  return (
    <Carousel autoplay>
      {props.images.map((image, index) => (
        <div key={index}>
          <img src={image} style={{ width: "100%", maxHeight: "250px" }} />
        </div>
      ))}
    </Carousel>
  )
}

export default ImageSlider
