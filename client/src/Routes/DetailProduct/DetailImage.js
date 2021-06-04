import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"
import { LazyLoadImage } from "react-lazy-load-image-component"

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

const GalleryZone = styled.div`
  background-color: black;
`

function DetailImage() {
  const [test, setTest] = useState(false)

  const {
    data: { product },
  } = useSelector((state) => state.product)

  const onClickButton = () => {
    setTest(true)
  }

  return (
    <>
      {/* <CSSTransition
        in={test}
        timeout={2000}
        classNames="gallery"
        unmountOnExit
      >
        <div
          style={{
            height: "100vh",
            width: "100%",
          }}
        >
          <SLazyLoadImage
            style={{ width: 300, height: 300 }}
            src={
              data &&
              data.product &&
              data.product.images &&
              data.product.images.length > 0 &&
              data.product.images[0]
            }
          />
        </div>
      </CSSTransition> */}
      {product && product.images && product.images.length === 1 && (
        <Container>
          <SLazyLoadImage
            src={product.images[0]}
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
      {product && product.images && product.images.length === 2 && (
        <Container>
          <SLazyLoadImage
            src={product.images[0]}
            style={{
              gridArea: "1 / 1 / 3 / 3",
              borderTopLeftRadius: "1rem",
              borderBottomLeftRadius: "1rem",
            }}
          />
          <SLazyLoadImage
            src={product.images[1]}
            style={{
              gridArea: "1 / 3 / 3 / 5",
              borderTopRightRadius: "1rem",
              borderBottomRightRadius: "1rem",
            }}
          />
        </Container>
      )}
      {product && product.images && product.images.length === 3 && (
        <Container>
          <SLazyLoadImage
            src={product.images[0]}
            style={{
              gridArea: "1 / 1 / 3 / 3",
              borderTopLeftRadius: "1rem",
              borderBottomLeftRadius: "1rem",
            }}
          />
          <SLazyLoadImage
            src={product.images[1]}
            style={{
              gridArea: "1 / 3 / 2 / 5",
              borderTopRightRadius: "1rem",
            }}
          />
          <SLazyLoadImage
            src={product.images[2]}
            style={{
              gridArea: "2 / 3 / 3 / 5",

              borderBottomRightRadius: "1rem",
            }}
          />
        </Container>
      )}
      {product && product.images && product.images.length === 4 && (
        <Container>
          <SLazyLoadImage
            src={product.images[0]}
            style={{
              gridArea: "1 / 1 / 3 / 3",
              borderTopLeftRadius: "1rem",
              borderBottomLeftRadius: "1rem",
            }}
          />
          <SLazyLoadImage
            src={product.images[1]}
            style={{
              gridArea: "1 / 3 / 2 / 4",
            }}
          />
          <SLazyLoadImage
            src={product.images[2]}
            style={{
              gridArea: "1 / 4 / 2 / 5",
              borderTopRightRadius: "1rem",
            }}
          />
          <SLazyLoadImage
            src={product.images[3]}
            style={{
              gridArea: "2 / 3 / 3 / 5",
              borderBottomRightRadius: "1rem",
            }}
          />
        </Container>
      )}
      {product && product.images && product.images.length >= 5 && (
        <Container>
          <GalleryZone
            onClick={onClickButton}
            style={{
              gridArea: "1 / 1 / 3 / 3",
              borderTopLeftRadius: "1rem",
              borderBottomLeftRadius: "1rem",
            }}
          >
            <SLazyLoadImage
              src={`http://localhost:5000/${product.images[0]}`}
              style={{
                borderTopLeftRadius: "1rem",
                borderBottomLeftRadius: "1rem",
              }}
            />
          </GalleryZone>
          <GalleryZone style={{ gridArea: "1 / 3 / 2 / 4" }}>
            <SLazyLoadImage src={product.images[1]} />
          </GalleryZone>
          <GalleryZone
            style={{ gridArea: "1 / 4 / 2 / 5", borderTopRightRadius: "1rem" }}
          >
            <SLazyLoadImage
              src={product.images[2]}
              style={{
                borderTopRightRadius: "1rem",
              }}
            />
          </GalleryZone>
          <GalleryZone style={{ gridArea: "2 / 3 / 3 / 4" }}>
            <SLazyLoadImage src={product.images[3]} />
          </GalleryZone>
          <GalleryZone
            style={{
              gridArea: "2 / 4 / 3 / 5",
              borderBottomRightRadius: "1rem",
            }}
          >
            <SLazyLoadImage
              src={product.images[4]}
              style={{
                borderBottomRightRadius: "1rem",
              }}
            />
          </GalleryZone>
        </Container>
      )}
    </>
  )
}

export default DetailImage
