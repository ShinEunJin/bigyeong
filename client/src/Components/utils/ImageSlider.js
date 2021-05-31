import React from "react"
import { Carousel } from "antd"
import dotenv from "dotenv"
dotenv.config()

function ImageSlider(props) {
  return (
    <Carousel>
      {props.images.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            style={{
              width: "100%",
              height: "250px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      ))}
    </Carousel>
  )
}

export default ImageSlider
