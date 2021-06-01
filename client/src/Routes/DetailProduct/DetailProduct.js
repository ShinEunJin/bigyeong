import React, { useState, useEffect } from "react"
import axios from "axios"
import { withRouter } from "react-router"
import styled from "styled-components"
import DetailImage from "./DetailImage"
import DetailInfo from "./DetailInfo"
import Comments from "../../Components/utils/Comments"
import Loading from "../../Components/Loading"

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 3rem;
`

function DetailProduct(props) {
  const productId = props.match.params.id

  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)

  const getProductDetail = async () => {
    try {
      const { data } = await axios.get(`/api/product/detail?id=${productId}`)
      setProduct(data.product)
    } catch {
      alert("해당 상품을 불러오는데 실패하였습니다.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getProductDetail()
  }, [productId])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <DetailImage product={product} />
          <DetailInfo product={product} />
          <Comments />
        </Container>
      )}
    </>
  )
}

export default withRouter(DetailProduct)
