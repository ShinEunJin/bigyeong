import React from "react"
import styled from "styled-components"
import { Carousel } from "antd"
import dotenv from "dotenv"
dotenv.config()

const images = [
  process.env.REACT_APP_DEV_PORT + "/uploads/repImages/repImage1.jpg",
  process.env.REACT_APP_DEV_PORT + "/uploads/repImages/repImage2.jpg",
  process.env.REACT_APP_DEV_PORT + "/uploads/repImages/repImage3.jpg",
  process.env.REACT_APP_DEV_PORT + "/uploads/repImages/repImage4.jpg",
]

const Container = styled.div`
  position: relative;
`

const FontImg = styled.img`
  position: absolute;
  z-index: 2;
  opacity: 0.8;
  top: 15%;
  right: 5%;
`

const Text = styled.div`
  position: absolute;
  z-index: 2;
  color: white;
  bottom: 20%;
  left: 5%;
  font-size: 3em;
  font-weight: 600;
`

const Span = styled.span`
  display: block;
  margin-bottom: 10px;
`

const RepImageColumn = styled.div``

const Img = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: cover;
  object-position: center;
`

function RepImageSlider() {
  return (
    <Container>
      <FontImg
        src={process.env.REACT_APP_DEV_PORT + "/logo/font_title.png"}
      ></FontImg>
      <Text>
        <Span>우리가</Span>
        <Span>모르고 있었던</Span>
        <Span>근처의 숨은 명소들</Span>
      </Text>
      <Carousel effect="fade" autoplay>
        {images &&
          images.length > 0 &&
          images.map((item, index) => (
            <RepImageColumn key={index}>
              <Img src={item} />
            </RepImageColumn>
          ))}
      </Carousel>
    </Container>
  )
}

export default RepImageSlider
