import React, { useEffect, useState } from "react"
import styled from "styled-components"
import dotenv from "dotenv"

dotenv.config()

const prod = process.env.NODE_ENV === "production"
const dev = process.env.NODE_ENV === "development"

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 30vh);
  grid-gap: 0.6rem;
  margin-bottom: 5rem;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`

function DetailImage(props) {
  const [imageState, setImageState] = useState([])

  useEffect(() => {
    if (
      props.product &&
      props.product.images &&
      props.product.images.length > 0
    ) {
      let newImages = []
      for (let image of props.product.images) {
        if (prod) {
          newImages.push(`${image}`)
        }
        if (dev) {
          newImages.push(`http://localhost:5000/${image}`)
        }
      }
      setImageState(newImages)
    }
  }, [props.product])

  return (
    <>
      {imageState && imageState.length === 1 && (
        <Container>
          <Img
            src={imageState[0]}
            style={{
              gridArea: "1 / 1 / 3 / 5",
              borderTopLeftRadius: "1rem",
              borderBottomLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
              borderBottomRightRadius: "1rem",
            }}
          />
        </Container>
      )}
      {imageState && imageState.length === 2 && (
        <Container>
          <Img
            src={imageState[0]}
            style={{
              gridArea: "1 / 1 / 3 / 3",
              borderTopLeftRadius: "1rem",
              borderBottomLeftRadius: "1rem",
            }}
          />
          <Img
            src={imageState[1]}
            style={{
              gridArea: "1 / 3 / 3 / 5",
              borderTopRightRadius: "1rem",
              borderBottomRightRadius: "1rem",
            }}
          />
        </Container>
      )}
      {imageState && imageState.length === 3 && (
        <Container>
          <Img
            src={imageState[0]}
            style={{
              gridArea: "1 / 1 / 3 / 3",
              borderTopLeftRadius: "1rem",
              borderBottomLeftRadius: "1rem",
            }}
          />
          <Img
            src={imageState[1]}
            style={{
              gridArea: "1 / 3 / 2 / 5",
              borderTopRightRadius: "1rem",
            }}
          />
          <Img
            src={imageState[2]}
            style={{
              gridArea: "2 / 3 / 3 / 5",

              borderBottomRightRadius: "1rem",
            }}
          />
        </Container>
      )}
      {imageState && imageState.length === 4 && (
        <Container>
          <Img
            src={imageState[0]}
            style={{
              gridArea: "1 / 1 / 3 / 3",
              borderTopLeftRadius: "1rem",
              borderBottomLeftRadius: "1rem",
            }}
          />
          <Img
            src={imageState[1]}
            style={{
              gridArea: "1 / 3 / 2 / 4",
            }}
          />
          <Img
            src={imageState[2]}
            style={{
              gridArea: "1 / 4 / 2 / 5",
              borderTopRightRadius: "1rem",
            }}
          />
          <Img
            src={imageState[3]}
            style={{
              gridArea: "2 / 3 / 3 / 5",
              borderBottomRightRadius: "1rem",
            }}
          />
        </Container>
      )}
      {imageState && imageState.length >= 5 && (
        <Container>
          <Img
            src={imageState[0]}
            style={{
              gridArea: "1 / 1 / 3 / 3",
              borderTopLeftRadius: "1rem",
              borderBottomLeftRadius: "1rem",
            }}
          />
          <Img src={imageState[1]} style={{ gridArea: "1 / 3 / 2 / 4" }} />
          <Img
            src={imageState[2]}
            style={{ gridArea: "1 / 4 / 2 / 5", borderTopRightRadius: "1rem" }}
          />
          <Img src={imageState[3]} style={{ gridArea: "2 / 3 / 3 / 4" }} />
          <Img
            src={imageState[4]}
            style={{
              gridArea: "2 / 4 / 3 / 5",
              borderBottomRightRadius: "1rem",
            }}
          />
        </Container>
      )}
    </>
  )
}

export default DetailImage
