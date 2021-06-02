import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../../_actions/product_action"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Checkbox from "../../Components/utils/CheckBox"
import SearchProduct from "../../Components/utils/SearchProduct"
import Loading from "../../Components/Loading"
import { Row, Col, Menu } from "antd"
import { AiFillHeart, AiFillEye, AiOutlineUnorderedList } from "react-icons/ai"

const { SubMenu } = Menu

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

const SMenu = styled(Menu)`
  width: 9rem;
  background-color: rgba(230, 230, 255, 0.5);
  outline: none;
`

const StyleSubMenu = styled.div`
  display: flex;
  align-items: center;
  color: black;
`

function Begin() {
  const dispatch = useDispatch()

  const { data, loading } = useSelector((state) => state.product)

  const [searchTerm, setSearchTerm] = useState("")
  const [region, setRegion] = useState([])
  const [sortBy, setSortBy] = useState("")

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getProducts({ skip: 0, limit: 8, region: "", searchTerm: "" }))
  }, [])

  const handleCheckFilter = (filters) => {
    let newFilters = [...filters]
    setRegion(newFilters)
    if (newFilters.length === 0) {
      dispatch(
        getProducts({ skip: 0, limit: 8, searchTerm, sortBy, region: "" })
      )
    } else {
      dispatch(
        getProducts({
          skip: 0,
          limit: 8,
          searchTerm,
          sortBy,
          region: newFilters,
        })
      )
    }
  }

  let timer
  const handleSearchFilter = (searchTerm) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      setSearchTerm(searchTerm)
      dispatch(getProducts({ skip: 0, limit: 8, searchTerm, sortBy, region }))
    }, 500)
  }

  const onMenuClick = (e) => {
    if (e.key === "1") {
      setSortBy("popular")
      dispatch(
        getProducts({
          skip: 0,
          limit: 8,
          region,
          sortBy: "popular",
          searchTerm,
        })
      )
    } else if (e.key === "2") {
      setSortBy("like")
      dispatch(
        getProducts({
          skip: 0,
          limit: 8,
          region,
          sortBy: "like",
          searchTerm,
        })
      )
    } else {
      setSortBy("new")
      dispatch(
        getProducts({
          skip: 0,
          limit: 8,
          region,
          sortBy: "new",
          searchTerm,
        })
      )
    }
  }

  return (
    <Container>
      <SearchSection>
        <SearchColumn>
          <div>
            <Label>검색하기</Label>
            <SearchProduct handleSearchFilter={handleSearchFilter} />
          </div>
          <div style={{ height: "6rem", marginBottom: "8rem" }}>
            <Label>지역 선택</Label>
            <Checkbox
              handleCheckFilter={(filters) => handleCheckFilter(filters)}
            />
          </div>
          <div>
            <SMenu
              triggerSubMenuAction="click"
              mode="vertical"
              defaultSelectedKeys={["1"]}
              onClick={(e) => onMenuClick(e)}
            >
              <SubMenu
                title={
                  <StyleSubMenu>
                    <AiOutlineUnorderedList
                      style={{
                        fontSize: "1.2em",
                        marginRight: "0.5rem",
                      }}
                    />
                    <span>정렬 기준</span>
                  </StyleSubMenu>
                }
              >
                <Menu.Item key="1">인기순</Menu.Item>
                <Menu.Item key="2">좋아요순</Menu.Item>
                <Menu.Item key="3">최신순</Menu.Item>
              </SubMenu>
            </SMenu>
          </div>
        </SearchColumn>
        <CategoryColumn></CategoryColumn>
      </SearchSection>
      <ProductSection>
        {loading ? (
          <Loading />
        ) : (
          <Row gutter={[38, 48]}>
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
