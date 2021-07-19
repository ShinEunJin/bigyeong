import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ImageGallery from "react-image-gallery"
import dotenv from "dotenv"
import { useMediaQuery } from "react-responsive"
import theme from "../../hoc/theme"
import Loading from "../../Components/Loading"
import axios from "axios"
import styled from "styled-components"
import routes from "../../routes"

dotenv.config()
//이미지를 눌렀을 때 react-image-gallery 사용

const Container = styled.div`
  width: 100%;
  background-color: black;
`

function DetailGallery() {
  const { product } = useSelector((state) => state.product)

  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState([])

  const getImages = async () => {
    const { data } = await axios.get(
      `${routes.apiProduct}${routes.gallery}?productId=${product._id}`
    )
    setImages(data.gallery)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    try {
      getImages()
    } catch (error) {
      alert("사진을 불러오는데 실패하였습니다.")
    } finally {
      setLoading(false)
    }
  }, [product])

  const isTabletOrLaptop = useMediaQuery({ query: theme.tablet })

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          {isTabletOrLaptop ? (
            /* 모바일 모드 일 때는 갤러리 사용하지 않고 그냥 사진 세로로 나열 */
            <>
              {product.images &&
                product.images.length > 0 &&
                product.images.map((item, index) => (
                  <img
                    style={{ width: "100%" }}
                    key={index}
                    src={
                      process.env.NODE_ENV === "development"
                        ? `http://localhost:3000/${item}`
                        : `${item}`
                    }
                  />
                ))}
            </>
          ) : (
            /* 컴퓨터 모드에서 이미지 갤러리 사용 */
            <ImageGallery thumbnailPosition="left" items={images} lazyLoad />
          )}
        </>
      )}
    </Container>
  )
}

export default DetailGallery
