import React from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { Link } from "react-router-dom"
import dotenv from "dotenv"

dotenv.config()

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 40vh);
  grid-gap: 0.6rem;
  margin-bottom: 5rem;
`

const SLazyLoadImage = styled(LazyLoadImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  background-color: #b2b2b2;
  transition: 0.2s opacity;
  &:hover {
    opacity: 0.9;
  }
`

const SLink = styled(Link)`
  background-color: black;
  display: flex;
  justify-content: center;
`

const MoreImage = styled.div`
  color: black;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  border-radius: 5px;
  background-color: rgba(245, 245, 245, 0.9);
  font-weight: 600;
  font-size: 0.9em;
  padding: 0.5rem;
  &:hover {
    opacity: 0.9;
  }
`

function DetailImage() {
  const { product } = useSelector((state) => state.product)

  return (
    <>
      {/* 1, 2, 3, 4, 5장 일 때마다 모두 모서리 각이 달라서 직접 style 주기 */}
      {product && product.images && product.images.length === 1 && (
        <Container>
          <SLink
            to={`/product/${product._id}/gallery`}
            style={{
              gridArea: "1 / 1 / 3 / 5",
              borderTopLeftRadius: "1rem",
              borderBottomLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
              borderBottomRightRadius: "1rem",
            }}
          >
            <SLazyLoadImage
              src={
                process.env.NODE_ENV === "development"
                  ? `http://localhost:3000/${product.images[0]}`
                  : product.images[0]
              }
              style={{
                borderTopLeftRadius: "1rem",
                borderBottomLeftRadius: "1rem",
                borderTopRightRadius: "1rem",
                borderBottomRightRadius: "1rem",
              }}
            />
          </SLink>
        </Container>
      )}
      {product && product.images && product.images.length === 2 && (
        <Container>
          <SLink
            to={`/product/${product._id}/gallery`}
            style={{
              gridArea: "1 / 1 / 3 / 3",
              borderTopLeftRadius: "1rem",
              borderBottomLeftRadius: "1rem",
            }}
          >
            <SLazyLoadImage
              src={
                process.env.NODE_ENV === "development"
                  ? `http://localhost:3000/${product.images[0]}`
                  : product.images[0]
              }
              style={{
                borderTopLeftRadius: "1rem",
                borderBottomLeftRadius: "1rem",
              }}
            />
          </SLink>
          <SLink
            to={`/product/${product._id}/gallery`}
            style={{
              gridArea: "1 / 3 / 3 / 5",
              borderTopRightRadius: "1rem",
              borderBottomRightRadius: "1rem",
            }}
          >
            <SLazyLoadImage
              src={
                process.env.NODE_ENV === "development"
                  ? `http://localhost:3000/${product.images[1]}`
                  : product.images[1]
              }
              style={{
                borderTopRightRadius: "1rem",
                borderBottomRightRadius: "1rem",
              }}
            />
          </SLink>
        </Container>
      )}
      {product && product.images && product.images.length === 3 && (
        <Container>
          <SLink
            to={`/product/${product._id}/gallery`}
            style={{
              gridArea: "1 / 1 / 3 / 3",
              borderTopLeftRadius: "1rem",
              borderBottomLeftRadius: "1rem",
            }}
          >
            <SLazyLoadImage
              src={
                process.env.NODE_ENV === "development"
                  ? `http://localhost:3000/${product.images[0]}`
                  : product.images[0]
              }
              style={{
                borderTopLeftRadius: "1rem",
                borderBottomLeftRadius: "1rem",
              }}
            />
          </SLink>
          <SLink
            to={`/product/${product._id}/gallery`}
            style={{
              gridArea: "1 / 3 / 2 / 5",
              borderTopRightRadius: "1rem",
            }}
          >
            <SLazyLoadImage
              src={
                process.env.NODE_ENV === "development"
                  ? `http://localhost:3000/${product.images[1]}`
                  : product.images[1]
              }
              style={{
                borderTopRightRadius: "1rem",
              }}
            />
          </SLink>
          <SLink
            to={`/product/${product._id}/gallery`}
            style={{
              gridArea: "2 / 3 / 3 / 5",
              borderBottomRightRadius: "1rem",
            }}
          >
            <SLazyLoadImage
              src={
                process.env.NODE_ENV === "development"
                  ? `http://localhost:3000/${product.images[2]}`
                  : product.images[2]
              }
              style={{
                borderBottomRightRadius: "1rem",
              }}
            />
          </SLink>
        </Container>
      )}
      {product && product.images && product.images.length === 4 && (
        <Container>
          <SLink
            to={`/product/${product._id}/gallery`}
            style={{
              gridArea: "1 / 1 / 3 / 3",
              borderTopLeftRadius: "1rem",
              borderBottomLeftRadius: "1rem",
            }}
          >
            <SLazyLoadImage
              src={
                process.env.NODE_ENV === "development"
                  ? `http://localhost:3000/${product.images[0]}`
                  : product.images[0]
              }
              style={{
                gridArea: "1 / 1 / 3 / 3",
                borderTopLeftRadius: "1rem",
                borderBottomLeftRadius: "1rem",
              }}
            />
          </SLink>
          <SLink
            to={`/product/${product._id}/gallery`}
            style={{
              gridArea: "1 / 3 / 2 / 4",
            }}
          >
            <SLazyLoadImage
              src={
                process.env.NODE_ENV === "development"
                  ? `http://localhost:3000/${product.images[1]}`
                  : product.images[1]
              }
            />
          </SLink>
          <SLink
            to={`/product/${product._id}/gallery`}
            style={{
              gridArea: "1 / 4 / 2 / 5",
              borderTopRightRadius: "1rem",
            }}
          >
            <SLazyLoadImage
              src={
                process.env.NODE_ENV === "development"
                  ? `http://localhost:3000/${product.images[2]}`
                  : product.images[2]
              }
              style={{
                borderTopRightRadius: "1rem",
              }}
            />
          </SLink>
          <SLink
            to={`/product/${product._id}/gallery`}
            style={{
              gridArea: "2 / 3 / 3 / 5",
              borderBottomRightRadius: "1rem",
            }}
          >
            <SLazyLoadImage
              src={
                process.env.NODE_ENV === "development"
                  ? `http://localhost:3000/${product.images[3]}`
                  : product.images[3]
              }
              style={{
                borderBottomRightRadius: "1rem",
              }}
            />
          </SLink>
        </Container>
      )}
      {product && product.images && product.images.length >= 5 && (
        <Container>
          <SLink
            to={`/product/${product._id}/gallery`}
            style={{
              gridArea: "1 / 1 / 3 / 3",
              borderTopLeftRadius: "1rem",
              borderBottomLeftRadius: "1rem",
            }}
          >
            <SLazyLoadImage
              src={
                process.env.NODE_ENV === "development"
                  ? `http://localhost:3000/${product.images[0]}`
                  : product.images[0]
              }
              style={{
                borderTopLeftRadius: "1rem",
                borderBottomLeftRadius: "1rem",
              }}
            />
          </SLink>
          <SLink
            to={`/product/${product._id}/gallery`}
            style={{ gridArea: "1 / 3 / 2 / 4" }}
          >
            <SLazyLoadImage
              src={
                process.env.NODE_ENV === "development"
                  ? `http://localhost:3000/${product.images[1]}`
                  : product.images[1]
              }
            />
          </SLink>
          <SLink
            to={`/product/${product._id}/gallery`}
            style={{ gridArea: "1 / 4 / 2 / 5", borderTopRightRadius: "1rem" }}
          >
            <SLazyLoadImage
              src={
                process.env.NODE_ENV === "development"
                  ? `http://localhost:3000/${product.images[2]}`
                  : product.images[2]
              }
              style={{
                borderTopRightRadius: "1rem",
              }}
            />
          </SLink>
          <SLink
            to={`/product/${product._id}/gallery`}
            style={{ gridArea: "2 / 3 / 3 / 4" }}
          >
            <SLazyLoadImage
              src={
                process.env.NODE_ENV === "development"
                  ? `http://localhost:3000/${product.images[3]}`
                  : product.images[3]
              }
            />
          </SLink>
          <SLink
            to={`/product/${product._id}/gallery`}
            style={{
              gridArea: "2 / 4 / 3 / 5",
              borderBottomRightRadius: "1rem",
              position: "relative",
            }}
          >
            <SLazyLoadImage
              src={
                process.env.NODE_ENV === "development"
                  ? `http://localhost:3000/${product.images[4]}`
                  : product.images[4]
              }
              style={{
                borderBottomRightRadius: "1rem",
              }}
            />
            <MoreImage>모든 사진 보기 ➔</MoreImage>
          </SLink>
        </Container>
      )}
    </>
  )
}

export default DetailImage
