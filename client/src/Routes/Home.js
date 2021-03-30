import React, { useEffect, useState } from 'react'
import axios from "axios"
import styled from "styled-components"
import { Card, Col, Row } from "antd"
import Meta from "antd/lib/card/Meta"
import ImageSlider from '../Components/utils/ImageSlider'

const Container = styled.div`
    width: 80%;
    margin: 0 auto;
`

function Home() {

    const [product, setProduct] = useState([])

    useEffect(async () => {
        const {
            data: { success, products }
        } = await axios.post("/api/product/products")
        if (success) {
            setProduct(products)
        } else {
            alert("상품을 가져오는데 실패 했습니다.")
        }
    })

    return (
        <Container>
            <Row gutter={16}>
                {product.map((item, index) => (
                    <Col key={index} lg={6} md={8} xs={24}>
                        <Card cover={<ImageSlider images={item.images} />}>
                            <Meta title={item.name} description={item.region} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Home
