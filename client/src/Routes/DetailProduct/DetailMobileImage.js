import React from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { Slide } from "react-slideshow-image"
import { Link } from "react-router-dom"
import dotenv from "dotenv"

dotenv.config()

const Container = styled.div`
  width: 100%;
  height: 80vh;
  margin-bottom: 5rem;
  position: relative;
`

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Img = styled.div`
  width: 100%;
  height: 80vh;
  border-radius: 1rem;
`

const MoreImage = styled.div`
  color: black;
  position: absolute;
  font-size: 0.8em;
  bottom: 0.5rem;
  right: 0.5rem;
  width: 6em;
  text-align: center;
  border-radius: 5px;
  background-color: rgba(245, 245, 245, 0.9);
  font-weight: 600;
  padding: 0.5rem;
  opacity: 0.7;
  &:hover {
    opacity: 0.9;
  }
`

function DetailMobileImage() {
  const { product } = useSelector((state) => state.product)

  return (
    <Container>
      <Slide easing="ease">
        {product &&
          product.images &&
          product.images.length > 0 &&
          product.images.map((item, index) => (
            <Div key={index}>
              <Img
                style={{
                  backgroundImage:
                    process.env.NODE_ENV === "development"
                      ? `url("http://localhost:3000/${item}")`
                      : `url("${item}")`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></Img>
            </Div>
          ))}
      </Slide>
      <Link to={`/product/${product._id}/gallery`}>
        <MoreImage>모두 보기</MoreImage>
      </Link>
    </Container>
  )
}

export default DetailMobileImage
