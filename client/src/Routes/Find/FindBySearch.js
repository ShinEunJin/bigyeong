import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../../_actions/product_action"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Checkbox from "../../Components/utils/CheckBox"
import SearchProduct from "../../Components/utils/SearchProduct"
import Loading from "../../Components/Loading"
import { Row, Col } from "antd"
import { AiFillHeart, AiFillEye } from "react-icons/ai"

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-bottom: 10rem;
`

const SearchSection = styled.div`
  padding-top: 3rem;
  display: flex;
  margin-bottom: 3vh;
`

const SearchColumn = styled.div`
  width: 40%;
`

const CategoryColumn = styled.div`
  width: 50%;
`

const Label = styled.label`
  display: inline-block;
  padding: 1rem;
  font-weight: 600;
  font-size: 1.1em;
`

const ProductSection = styled.div``

const Card = styled.div`
  width: 22rem;
  height: 23rem;
  background-color: white;
  border: 1px solid rgba(180, 180, 180, 0.3);
  position: relative;
`

const Img = styled.img`
  width: 100%;
  height: 17rem;
  object-fit: cover;
  object-position: center;
  margin-bottom: 0.5rem;
`

const Title = styled.div`
  font-weight: 600;
  width: 80%;
  margin-bottom: 0.8rem;
  padding-left: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Address = styled.div`
  font-size: 0.9em;
  width: 90%;
  opacity: 0.8;
  padding-left: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Likes = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
  display: flex;
  align-items: center;
`

const Icon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
`

function Begin() {
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.product)

  let query = {
    category: null,
    skip: 0,
    limit: 8,
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getProducts(query))
  }, [])

  return (
    <Container>
      <SearchSection>
        <SearchColumn>
          <div>
            <Label>검색하기</Label>
            <SearchProduct />
          </div>
          <div style={{ height: "6rem", marginBottom: "6rem" }}>
            <Label>지역 선택</Label>
            <Checkbox />
          </div>
        </SearchColumn>
        <CategoryColumn></CategoryColumn>
      </SearchSection>
      <ProductSection>
        {loading ? (
          <Loading />
        ) : (
          <Row gutter={[16, 48]} justify="space-between">
            {data &&
              data.products &&
              data.products.length > 0 &&
              data.products.map((item, index) => (
                <Link key={index} to={`/product/${item._id}`}>
                  <Col lg={6} md={8} xs={24}>
                    <Card>
                      <Img src={item.images[0]} />
                      <Title>{item.name}</Title>
                      <Address>{item.address || item.region}</Address>
                      <Likes>
                        <Icon>
                          <AiFillHeart
                            style={{ color: "red", marginRight: "0.1rem" }}
                          />{" "}
                          {item.likes}
                        </Icon>
                        <Icon>
                          <AiFillEye
                            style={{ color: "gray", marginRight: "0.1rem" }}
                          />{" "}
                          {item.views}
                        </Icon>
                      </Likes>
                    </Card>
                  </Col>
                </Link>
              ))}
          </Row>
        )}
      </ProductSection>
    </Container>
  )
}

export default Begin
