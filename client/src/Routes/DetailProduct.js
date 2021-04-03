import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router'
import { Col, Row } from "antd"
import styled from "styled-components"
import DetailImage from "./DetailProduct/DetailImage"

const Container = styled.div`
    width: 80%;
    margin: 0 auto;
`

function DetailProduct(props) {
    const productId = props.match.params.id

    const [productState, setProductState] = useState({})

    useEffect(async () => {
        const {
            data: { success, product }
        } = await axios.get(`/api/product/detail?id=${productId}`)
        if (success) {
            setProductState(product)
        } else {
            alert("해당 상품을 찾을 수 없습니다.")
        }
    }, [])

    return (
        <>
            <Container>
                <Row gutter={[16, 16]}>
                    <Col lg={12} xs={24}>
                        <DetailImage product={productState} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default withRouter(DetailProduct)
