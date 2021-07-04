import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts, getProductsMore } from "../../_actions/product_action"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Checkbox from "../../Components/utils/CheckBox"
import SearchProduct from "../../Components/utils/SearchProduct"
import Loading from "../../Components/Loading"
import { Row, Col, Menu, Carousel } from "antd"
import { AiFillHeart, AiFillEye, AiOutlineUnorderedList } from "react-icons/ai"
import routes from "../../routes"

const { SubMenu } = Menu

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  padding-bottom: 10rem;
`

const SearchSection = styled.div`
  padding-top: 3rem;
  display: flex;
  justify-content: center;
  margin-bottom: 3vh;
`

const SearchColumn = styled.div`
  width: 40%;
`

const CategoryColumn = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`

const Label = styled.label`
  display: inline-block;
  padding: 1rem;
  font-weight: 600;
  font-size: 1.1em;
`

const ProductSection = styled.div``

const RepCard = styled.div`
  width: 28vw;
  height: 36vh;
  background-color: white;
  border: 1px solid rgba(180, 180, 180, 0.3);
  position: relative;
  color: black;
`

const Card = styled.div`
  width: 19vw;
  height: 37vh;
  background-color: white;
  border: 1px solid rgba(180, 180, 180, 0.3);
  position: relative;
  color: black;
  &:hover {
    transform: scale(1.01);
  }
`

const Img = styled.img`
  width: 100%;
  height: 27vh;
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
  background-color: rgba(240, 240, 240, 0.7);
  outline: none;
`

const StyleSubMenu = styled.div`
  display: flex;
  align-items: center;
  color: black;
`

let region = []
let searchTerm = ""
let sortBy = ""
let changedSkip = 0
let LIMIT = 9

function Begin() {
  const dispatch = useDispatch()

  const { products, repProduct, loading } = useSelector(
    (state) => state.product
  )

  useEffect(() => {
    changedSkip = 0
    window.scrollTo(0, 0)
    window.addEventListener("scroll", handleScroll)
    dispatch(getProducts({ skip: 0, limit: LIMIT, region: "", searchTerm: "" }))
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(trigger)
    }
  }, [dispatch])

  let trigger
  const handleScroll = () => {
    clearTimeout(trigger)
    trigger = setTimeout(() => {
      if (window.scrollY >= document.body.scrollHeight - window.innerHeight) {
        changedSkip = changedSkip + LIMIT
        dispatch(
          getProductsMore({
            skip: changedSkip,
            limit: LIMIT,
            region,
            searchTerm,
            sortBy,
          })
        )
      }
    }, 300)
  }

  const handleCheckFilter = (filters) => {
    let newFilters = [...filters]
    changedSkip = 0
    region = newFilters
    if (newFilters.length === 0) {
      dispatch(
        getProducts({ skip: 0, limit: LIMIT, searchTerm, sortBy, region: "" })
      )
    } else {
      dispatch(
        getProducts({
          skip: 0,
          limit: LIMIT,
          searchTerm,
          sortBy,
          region: newFilters,
        })
      )
    }
  }

  let debouncingTimer
  const handleSearchFilter = (Term) => {
    if (debouncingTimer) {
      clearTimeout(debouncingTimer)
    }
    debouncingTimer = setTimeout(() => {
      changedSkip = 0
      searchTerm = Term
      dispatch(
        getProducts({ skip: 0, limit: LIMIT, searchTerm, sortBy, region })
      )
    }, 500)
  }

  const dispatchUtils = (category) => {
    sortBy = category
    dispatch(
      getProducts({
        skip: 0,
        limit: LIMIT,
        region,
        searchTerm,
        sortBy: category,
      })
    )
  }

  const onMenuClick = (e) => {
    changedSkip = 0
    if (e.key === "1") {
      dispatchUtils("popular")
    } else if (e.key === "2") {
      dispatchUtils("like")
    } else {
      dispatchUtils("new")
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
        <CategoryColumn>
          {repProduct && (
            <Link to={routes.product(repProduct._id)}>
              <RepCard>
                <Carousel autoplay>
                  {repProduct.images &&
                    repProduct.images.length > 0 &&
                    repProduct.images.map((item, index) => (
                      <div key={index}>
                        <Img src={item} />
                      </div>
                    ))}
                </Carousel>
                <Title>{repProduct.name}</Title>
                <Address>{repProduct.address || repProduct.region}</Address>
                <Likes>
                  <Icon>
                    <AiFillHeart
                      style={{ color: "red", marginRight: "0.1rem" }}
                    />{" "}
                    {repProduct.likes}
                  </Icon>
                  <Icon>
                    <AiFillEye
                      style={{ color: "gray", marginRight: "0.1rem" }}
                    />{" "}
                    {repProduct.views}
                  </Icon>
                </Likes>
              </RepCard>
            </Link>
          )}
        </CategoryColumn>
      </SearchSection>
      <ProductSection>
        {loading ? (
          <Loading />
        ) : (
          <Row
            gutter={[38, 48]}
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            {products &&
              products.length > 0 &&
              products.map((item, index) => (
                <Link key={index} to={routes.product(item._id)}>
                  <Col lg={8} md={12} xs={24}>
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
