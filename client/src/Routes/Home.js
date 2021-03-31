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

const Button = styled.button`
    border-radius: 10px;
    border: 1px solid gray;
    font-size: 14px;
    width: 4rem;
    height: 2rem;
    cursor: pointer;
`

function Home() {

    const [products, setProducts] = useState([])
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(2)
    const [postSize, setPostSize] = useState(0)

    useEffect(() => {
        let body = { skip, limit }
        getProducts(body)
    }, [])

    const getProducts = async (body) => {
        const {
            data: { success, productInfo, productLen }
        } = await axios.post("/api/product/products", body)
        if (success) {
            if (body.loadMore) {
                setProducts([...products, ...productInfo])
            } else {
                setProducts(productInfo)
            }
            setPostSize(productLen)
        } else {
            alert("상품을 가져오는데 실패 했습니다.")
        }
    }

    const loadMoreHandler = () => {
        let changedSkip = skip + limit
        let body = { skip: changedSkip, limit, loadMore: true }
        getProducts(body)
        setSkip(changedSkip)
    }

    return (
        <Container>
            <Row gutter={16}>
                {products.map((item, index) => (
                    <Col key={index} lg={6} md={8} xs={24}>
                        <Card cover={<ImageSlider images={item.images} />}>
                            <Meta title={item.name} description={item.region} />
                        </Card>
                    </Col>
                ))}
            </Row>
            {postSize >= limit &&
                <Button onClick={loadMoreHandler}>더보기</Button>
            }

        </Container>
    )
}

export default Home
