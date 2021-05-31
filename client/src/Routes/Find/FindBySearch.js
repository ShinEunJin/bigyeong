import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import axios from "axios"
import styled from "styled-components"
import { Card, Col, Row } from "antd"
import { region } from "../../Components/utils/data"
import ImageSlider from "../../Components/utils/ImageSlider"
import CheckBox from "../../Components/utils/CheckBox"
import SearchProduct from "../../Components/utils/SearchProduct"
import { getProducts } from "../../_actions/product_action"

const { Meta } = Card

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 5vh;
`

const CategoryColumn = styled.div`
  display: flex;
`

const CheckBoxSection = styled.div`
  height: 150px;
`

let query = {
  category: "서울",
  skip: 0,
  limit: 8,
}

function Begin() {
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getProducts(query))
  }, [])

  return (
    <>
      <Container>
        <CategoryColumn>
          <Col span={8}>
            <CheckBoxSection>
              <CheckBox list={region} />
            </CheckBoxSection>
          </Col>
          <Col span={8}>
            <SearchProduct />
          </Col>
        </CategoryColumn>
        {/* <Row gutter={[16, 16]}>
          {products.map((item, index) => (
            <Col key={index} lg={6} md={8} xs={24}>
              <Link to={`/product/${item._id}`}>
                <Card cover={<ImageSlider images={item.images} />}>
                  <Meta
                    title={item.name}
                    description={item.region1 || item.region}
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row> */}
      </Container>
    </>
  )
}

export default Begin
