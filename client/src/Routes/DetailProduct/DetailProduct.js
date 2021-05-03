import React, { useState, useEffect } from "react"
import axios from "axios"
import { withRouter } from "react-router"
import { Col, Row } from "antd"
import styled from "styled-components"
import DetailImage from "./DetailImage"
import DetailInfo from "./DetailInfo"
import Comments from "../../Components/utils/Comments"
import Loading from "../../Components/Loading"
import dotenv from "dotenv"
dotenv.config()

const Container = styled.div`
  padding-top: 80px;
  width: 80%;
  margin: 0 auto;
  padding-bottom: 100px;
`

function DetailProduct(props) {
  const productId = props.match.params.id

  const [productState, setProductState] = useState({})
  const [loading, setLoading] = useState(true)

  const getProductDetail = async () => {
    try {
      const {
        data: { product },
      } = await axios.get(`/api/product/detail?id=${productId}`)
      setProductState(product)
    } catch {
      alert("해당 상품을 불러오는데 실패하였습니다.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductDetail()
    window.scrollTo(0, 0)
  }, [productId])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Row gutter={[16, 16]} style={{ marginBottom: "50px" }}>
            <Col lg={12} xs={24}>
              <DetailImage product={productState} />
            </Col>
            <Col lg={12} xs={24}>
              <DetailInfo product={productState} />
            </Col>
          </Row>
          <Comments />
        </Container>
      )}
    </>
  )
}

export default withRouter(DetailProduct)
