import React from "react"
import styled from "styled-components"
import { Carousel } from "antd"
import { HashLink } from "react-router-hash-link"
import dotenv from "dotenv"
dotenv.config()

let images = []

const prod = process.env.NODE_ENV === "production"
const dev = process.env.NODE_ENV === "development"

if (prod) {
  images = [
    "https://eunjintour.s3.ap-northeast-2.amazonaws.com/RepImages/adnan-ami-5GgFSc-hm_I-unsplash.jpg",
    "https://eunjintour.s3.ap-northeast-2.amazonaws.com/RepImages/bundo-kim-p_D5pbQG5TE-unsplash.jpg",
    "https://eunjintour.s3.ap-northeast-2.amazonaws.com/RepImages/hem-poudyal-Ys2s7QOQF1c-unsplash.jpg",
    "https://eunjintour.s3.ap-northeast-2.amazonaws.com/RepImages/yeo-khee--e6Xu27_T50-unsplash.jpg",
  ]
}

if (dev) {
  images = [
    process.env.REACT_APP_DEV_PORT + "/logo/repImages/repImage1.jpg",
    process.env.REACT_APP_DEV_PORT + "/logo/repImages/repImage2.jpg",
    process.env.REACT_APP_DEV_PORT + "/logo/repImages/repImage3.jpg",
    process.env.REACT_APP_DEV_PORT + "/logo/repImages/repImage4.jpg",
  ]
}

const Container = styled.div`
  position: relative;
`

const FontImg = styled.img`
  position: absolute;
  z-index: 2;
  opacity: 0.8;
  top: 10%;
  right: 5%;
`

const Text = styled.div`
  position: absolute;
  z-index: 2;
  color: white;
  bottom: 40%;
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

const StartBtnColumn = styled.div`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SHashLink = styled(HashLink)`
  width: 200px;
  height: 70px;
  border-radius: 20px;
  background-color: #8cadff;
  font-weight: 600;
  font-size: 1.3em;
  border: none;
  color: white;
  cursor: pointer;
  text-shadow: 1px 1px 1px #bdd0ff;
  box-shadow: 2px 2px 2px #82d5ff;
  display: flex;
  justify-content: center;
  align-items: center;
`

function RepPage() {
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
      <StartBtnColumn>
        <SHashLink smooth to="#map">
          시 작 하 기
        </SHashLink>
      </StartBtnColumn>
    </Container>
  )
}

export default RepPage
