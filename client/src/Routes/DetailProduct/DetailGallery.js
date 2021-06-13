import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ImageGallery from "react-image-gallery"
import dotenv from "dotenv"
import Loading from "../../Components/Loading"
import axios from "axios"
import styled from "styled-components"

dotenv.config()

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
      `/api/product/gallery?productId=${product._id}`
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

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <ImageGallery thumbnailPosition="left" items={images} lazyLoad />
      )}
    </Container>
  )
}

export default DetailGallery
