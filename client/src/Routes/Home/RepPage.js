import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Carousel } from "antd"
import { HashLink } from "react-router-hash-link"
import Fade from "react-reveal/Fade"

let images = [
  "logo/repImages/repImage1.jpg",
  "logo/repImages/repImage2.jpg",
  "logo/repImages/repImage3.jpg",
  "logo/repImages/repImage4.jpg",
]

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
  const [icon, setIcon] = useState("")
  const [repImages, setRepImages] = useState([])

  useEffect(() => {
    setIcon("logo/font_title.png")
    setRepImages(images)
  }, [])

  return (
    <Container>
      <FontImg src={icon}></FontImg>
      <Text>
        <Fade top delay={300} distance="1rem">
          <Span>우리가</Span>
        </Fade>
        <Fade top delay={700} distance="1rem">
          <Span>모르고 있었던</Span>
        </Fade>
        <Fade top delay={1100} distance="1rem">
          <Span>근처의 숨은 명소들</Span>
        </Fade>
      </Text>
      <Carousel effect="fade" autoplay>
        {repImages &&
          repImages.length > 0 &&
          repImages.map((item, index) => (
            <RepImageColumn key={index}>
              <Img src={item} />
            </RepImageColumn>
          ))}
      </Carousel>
      <StartBtnColumn>
        <SHashLink smooth to="#find">
          시 작 하 기
        </SHashLink>
      </StartBtnColumn>
    </Container>
  )
}

export default RepPage
