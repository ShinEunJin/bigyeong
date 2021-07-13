import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import axios from "axios"
import Loader from "../../Components/Loading"
import { Pagination } from "antd"
import { AiFillEye } from "react-icons/ai"
import Map from "../../Components/utils/Map/FindMap"
import routes from "../../routes"

const Container = styled.div`
  width: 100%;
  background-color: black;
  display: flex;
  @media ${(props) => props.theme.tablet} {
    display: unset;
  }
`

const MapSection = styled.div`
  width: 50%;
  height: calc(100vh - 3rem);
  top: 3rem;
  position: relative;
  position: sticky;
  @media ${(props) => props.theme.tablet} {
    width: 100%;
    height: calc(100vh - 3rem);
    top: 3rem;
  }
`

const IndexSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  width: 50%;
  @media ${(props) => props.theme.tablet} {
    display: none;
  }
`

const TitleColumn = styled.div`
  padding: 1rem;
`

const Column = styled.div``

const Content = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  margin-bottom: 1rem;
  border-radius: 10px;
  &:hover {
    background-color: rgba(10, 10, 10, 0.5);
  }
`

const Img = styled.img`
  width: 42%;
  min-width: 21rem;
  height: 14rem;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
  background-color: #b2b2b2;
`

const Info = styled.div`
  width: 45%;
  padding: 1rem 1rem 1rem 2rem;
  position: relative;
`

const Title = styled.div`
  font-size: 1.1em;
  margin-bottom: 1rem;
`

const Address = styled.div`
  opacity: 0.6;
  margin-bottom: 4px;
  font-size: 0.8em;
`

const LikeAndView = styled.div`
  display: flex;
  font-size: 0.9em;
  position: absolute;
  bottom: 5%;
`

const View = styled.div`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
`

const SLink = styled(Link)`
  &:hover {
    color: wheat;
  }
`

const Like = styled.div``

const PageColumn = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 3rem;
  padding-bottom: 1rem;
`

const Empty = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`

let markers = []

function Find(props) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [start, setStart] = useState(true)
  const [productsLen, setProductsLen] = useState(0)
  const [defaultPage, setDefaultPage] = useState(1)
  const [mouse, setMouse] = useState("")
  const [loadMap, setLoadMap] = useState({})
  const [position, setPosition] = useState({})

  const LIMIT = 10

  const mouseEvent = (target) => {
    setMouse(target)
  }

  const updateMap = (start, defaultPage) => {
    setStart(start)
    setDefaultPage(defaultPage)
  }

  const reloadMap = (map) => {
    setLoadMap(map)
  }

  //지저분하지만 query가 string으로 받아서 방향을 나눔
  const getProducts = async (top, right, bottom, left, skip) => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${routes.apiProductMap}?left=${left.toFixed(4)}&right=${right.toFixed(
          4
        )}&top=${top.toFixed(4)}&bottom=${bottom.toFixed(
          4
        )}&limit=${LIMIT}&skip=${skip}`
      )
      setPosition({ left, right, top, bottom })
      setProductsLen(data.productLen)
      setProducts(data.product)
    } catch (error) {
      alert("데이터를 불러오는데 실패하였습니다.")
    } finally {
      setLoading(false)
    }
  }

  const updateMarkers = async (map, top, right, bottom, left, skip) => {
    try {
      const { data } = await axios.get(
        `${routes.apiProductMap}?left=${left.toFixed(4)}&right=${right.toFixed(
          4
        )}&top=${top.toFixed(4)}&bottom=${bottom.toFixed(
          4
        )}&limit=${LIMIT}&skip=${skip}`
      )
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null)
      }
      markers = []
      if (data.product && data.product.length > 0) {
        for (let product of data.product) {
          let markerPosition = new kakao.maps.LatLng(
            product.coord.lat,
            product.coord.lng
          )
          let marker = new kakao.maps.Marker({
            position: markerPosition,
          })
          let content =
            `<a href=${routes.product(product._id)}>` +
            `<div class='card'>` +
            `<img class="card_image" src=${product.images[0]} />` +
            `<div class="card_title">${product.name}</div>` +
            `<div class="card_address">${product.address}</div>` +
            `<div class="card_likes">👁   ${product.views}</div>` +
            "</div>" +
            "</a>"
          let customOverlay = new kakao.maps.CustomOverlay({
            position: markerPosition,
            content,
            zIndex: 2,
            yAnchor: 1.2,
          })
          marker.setMap(map)
          markers.push(marker)
          kakao.maps.event.addListener(marker, "click", function () {
            if (customOverlay.getMap()) {
              customOverlay.setMap(null)
            } else {
              customOverlay.setMap(map)
            }
          })
          kakao.maps.event.addListener(map, "dragend", function () {
            customOverlay.setMap(null)
          })
          kakao.maps.event.addListener(marker, "mouseover", function () {
            mouseEvent(product._id)
          })
          kakao.maps.event.addListener(marker, "mouseout", function () {
            mouseEvent("")
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onChangePage = (page, map) => {
    setDefaultPage(page)
    getProducts(
      position.top,
      position.right,
      position.bottom,
      position.left,
      (page - 1) * LIMIT
    )
    updateMarkers(
      map,
      position.top,
      position.right,
      position.bottom,
      position.left,
      (page - 1) * LIMIT
    )
  }

  return (
    <Container theme={props.theme}>
      <MapSection theme={props.theme}>
        <Map
          reloadMap={reloadMap}
          getProducts={getProducts}
          updateMap={updateMap}
          mouseEvent={mouseEvent}
          updateMarkers={updateMarkers}
        ></Map>
      </MapSection>
      {/* 오른쪽 컨텐츠들 */}
      <IndexSection theme={props.theme}>
        <TitleColumn>
          <>
            {products && products.length > 0 && (
              <div>
                총 <span>{productsLen}</span>
                {productsLen === 100 ? "건 이상의 컨텐츠" : "건의 컨텐츠"}
              </div>
            )}
          </>
        </TitleColumn>
        <Column>
          {loading ? (
            <Loader />
          ) : (
            <>
              {products && products.length > 0 ? (
                products.map((item, index) => (
                  <SLink key={index} to={routes.product(item._id)}>
                    <Content
                      id={`${item._id}`}
                      style={{
                        backgroundColor: `${
                          item._id === mouse
                            ? "rgba(100, 100, 100, 0.7)"
                            : "transparent"
                        }`,
                      }}
                    >
                      <Img src={item.images[0]} />
                      <Info>
                        <Title>{item.name}</Title>
                        <Address>{item.address}</Address>
                        <Address>{item.location}</Address>
                        <LikeAndView>
                          <View>
                            <AiFillEye style={{ marginRight: 3 }} />
                            {item.views}
                          </View>
                          {/* <Like>
                              <AiFillHeart style={{ marginRight: 3 }} />
                              {item.likes}
                            </Like> */}
                        </LikeAndView>
                      </Info>
                    </Content>
                  </SLink>
                ))
              ) : (
                <Empty>
                  사진이 없습니다. 경치 좋은 사진 많이 올려주세요~ (ノ^∇^)
                </Empty>
              )}
            </>
          )}
        </Column>
        <PageColumn>
          <Pagination
            current={defaultPage}
            defaultCurrent={1}
            pageSize={LIMIT}
            onChange={(page) => onChangePage(page, loadMap)}
            total={productsLen}
          />
        </PageColumn>
      </IndexSection>
    </Container>
  )
}

export default Find
