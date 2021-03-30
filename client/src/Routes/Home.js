import React, { useEffect, useState } from 'react'
import axios from "axios"
import styled from "styled-components"
import { Card, Col, Row } from "antd"
import Meta from "antd/lib/card/Meta"

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
            <Col lg={6} md={8} s={12} xs={24}>
                {product.map((item, index) => (
                    <Card
                        key={index} cover={<img style={{ maxHeight: '250px' }}
                            src={`http://localhost:5000/${item.images[0]}`} />}
                    >
                        <Meta title={item.name} />
                    </Card>
                ))}
            </Col>
        </Container>
    )
}

export default Home
