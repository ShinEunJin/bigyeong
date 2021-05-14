/* import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import { Card, Col, Row } from "antd"
import Scroll from "react-scroll"
import ImageSlider from "../Components/utils/ImageSlider"
import CheckBox from "../Components/utils/CheckBox"
import SearchProduct from "../Components/utils/SearchProduct"
import RepImageSlider from "../Components/utils/RepImageSlider"
import dotenv from "dotenv"
dotenv.config()

const { Meta } = Card

const scroll = Scroll.animateScroll

const region = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "경기도",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주도",
]

const FirstContainer = styled.div`
  width: 100%;
  height: 100vh;
`

const StartBtnColumn = styled.div`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  width: 80%;
  height: 100vh;
  margin: 0 auto;
`

const StartBtn = styled.button`
  width: 200px;
  height: 70px;
  border-radius: 20px;
  background-color: #8cadff;
  font-weight: 600;
  font-size: 1.3em;
  border: none;
  color: white;
  cursor: pointer;
  text-shadow: 1px 1px 1px #bdd0ff;
  box-shadow: 2px 2px 2px #82d5ff;
`

const SogoImg = styled.img`
  height: 100px;
  width: 100px;
`

const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  font-size: 40px;
  font-weight: 700;
`

const CategoryColumn = styled.div`
  display: flex;
`

const CheckBoxSection = styled.div`
  height: 150px;
`

const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`

const Button = styled.button`
  border-radius: 10px;
  border: 1px solid gray;
  font-size: 14px;
  width: 4rem;
  height: 2rem;
  cursor: pointer;
`

function Begin() {
  const [products, setProducts] = useState([])
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(8)
  const [postSize, setPostSize] = useState(0)
  const [filterState, setFilterState] = useState({
    region: [],
  })
  const [searchTerm, setSearchTerm] = useState("")

  const getProducts = async (body) => {
    const {
      data: { success, productInfo, productLen },
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

  useEffect(() => {
    let body = { skip, limit }
    getProducts(body)
  }, [])

  const loadMoreHandler = () => {
    let changedSkip = skip + limit
    let body = { skip: changedSkip, limit, loadMore: true }
    getProducts(body)
    setSkip(changedSkip)
  }

  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit,
      filters,
    }
    getProducts(body)
    setSkip(0) //이전 스테이트로 변경 하게 해야 보기좋다.
  }

  const handleCheckFilter = (filters, category) => {
    const newFilters = { ...filterState }
    newFilters[category] = filters
    showFilteredResults(newFilters)
  }

  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      skip: 0,
      limit,
      filters: filterState,
      searchTerm: newSearchTerm,
    }
    setSkip(0)
    setSearchTerm(newSearchTerm)
    getProducts(body)
  }

  const onStartBtnHandler = () => {
    scroll.scrollTo(1000, { duration: 500 })
  }

  return (
    <>
      <FirstContainer>
        <RepImageSlider />
        <StartBtnColumn>
          <StartBtn onClick={onStartBtnHandler}>시 작 하 기</StartBtn>
        </StartBtnColumn>
      </FirstContainer>
      <Container>
        <Column>
          <SogoImg src={process.env.REACT_APP_DEV_PORT + "/logo/logo2.png"} />
          한국의 坊坊曲曲
        </Column>
        <CategoryColumn>
          <Col span={8}>
            <CheckBoxSection>
              <CheckBox
                list={region}
                handleCheckFilter={(filters) =>
                  handleCheckFilter(filters, "region")
                }
              />
            </CheckBoxSection>
          </Col>
          <Col span={8}>
            <SearchProduct refreshFunction={updateSearchTerm} />
          </Col>
        </CategoryColumn>
        <Row gutter={[16, 16]}>
          {products.map((item, index) => (
            <Col key={index} lg={6} md={8} xs={24}>
              <Link to={`/product/${item._id}`}>
                <Card cover={<ImageSlider images={item.images} />}>
                  <Meta title={item.name} description={item.region} />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        <ButtonSection>
          {postSize >= limit && (
            <Button onClick={loadMoreHandler}>더보기</Button>
          )}
        </ButtonSection>
      </Container>
    </>
  )
}

export default Begin
 */
