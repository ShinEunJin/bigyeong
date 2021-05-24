import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import axios from "axios"
import Loader from "../../Components/Loading"
import { Pagination } from "antd"
import { AiFillEye, AiFillHeart } from "react-icons/ai"

const Container = styled.div`
  width: 100%;
  background-color: #fafafa;
  display: flex;
`

const MapSection = styled.div`
  width: 50%;
  height: calc(100vh - 3rem);
  display: flex;
  position: relative;
  position: sticky;
  top: 3rem;
`

const Map = styled.div`
  width: 100%;
  height: 100%;
  border: 3px solid black;
`

const BeginSection = styled.div`
  width: 50%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.2rem;
`

const IndexSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  width: 50%;
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
    background-color: rgba(233, 233, 233, 0.8);
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

const Like = styled.div``

const PageColumn = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 3rem;
  padding-bottom: 1rem;
`

let markers = []

function Find() {
  const [products, setProducts] = useState([])
  const [address, setAddress] = useState({})
  const [loading, setLoading] = useState(false)
  const [start, setStart] = useState(true)
  const [filter, setFilter] = useState("")
  const [productsLen, setProductsLen] = useState(0)
  const [defaultPage, setDefaultPage] = useState(1)
  const [mouse, setMouse] = useState("")
  const [loadMap, setLoadMap] = useState({})

  const LIMIT = 5

  const getProducts = async (filter, skip) => {
    try {
      const { data } = await axios.get(
        `/api/product/products?filter=${filter}&limit=${LIMIT}&skip=${skip}`
      )
      setProductsLen(data.productLen)
      setFilter(filter)
      setProducts(data.product)
    } catch (error) {
      console.log(error)
    }
  }

  const updateMarkers = async (map, filter, skip) => {
    try {
      const { data } = await axios.get(
        `/api/product/products?filter=${filter}&limit=${LIMIT}&skip=${skip}`
      )

      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null)
      }
      markers = []

      if (data.product && data.product.length > 0) {
        for (let product of data.product) {
          let markerPosition = new kakao.maps.LatLng(
            product.coord.Ma,
            product.coord.La
          )
          let marker = new kakao.maps.Marker({
            position: markerPosition,
          })
          marker.setMap(map)
          markers.push(marker)
          kakao.maps.event.addListener(marker, "mouseover", function () {
            setMouse(product._id)
          })
          kakao.maps.event.addListener(marker, "mouseout", function () {
            setMouse("")
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onChangePage = (page, filter, map) => {
    console.log(page)
    setDefaultPage(page)
    getProducts(filter, (page - 1) * LIMIT)
    updateMarkers(map, filter, (page - 1) * LIMIT)
  }

  const loadKakaoMap = (lat, lng, level) => {
    const container = document.getElementById("kakao_map")
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level,
    }
    let map = new kakao.maps.Map(container, options)
    map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP)

    setLoadMap(map)
    const geocoder = new kakao.maps.services.Geocoder()

    function searchDetailAddrFromCoords(coords, callback) {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback)
    }

    kakao.maps.event.addListener(map, "dragend", function () {
      setStart(false)
      searchDetailAddrFromCoords(map.getCenter(), (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          try {
            setDefaultPage(1)
            setAddress(result[0].address)
            setLoading(true)
            getProducts(result[0].address.region_1depth_name, 0)
            updateMarkers(map, result[0].address.region_1depth_name, 0)
          } catch (error) {
            console.log(error)
          } finally {
            setLoading(false)
          }
        }
      })
    })
  }

  useCallback(() => {
    setMarkers(...markers)
  }, [markers])

  useEffect(() => {
    window.scrollTo(0, 0)
    loadKakaoMap(37.5642135, 127.0016985, 9)
  }, [])

  return (
    <Container>
      <MapSection>
        <Map id="kakao_map"></Map>
      </MapSection>
      {start ? (
        <BeginSection>지도를 움직여 주십시오.</BeginSection>
      ) : (
        <IndexSection>
          <TitleColumn>
            <div style={{ opacity: 0.6 }}>
              지도 중심 [{" "}
              <span style={{ fontSize: "1.1em", fontWeight: 600 }}>
                {address.region_1depth_name} {address.region_2depth_name}{" "}
                {address.region_3depth_name}
              </span>{" "}
              ]
            </div>
            <>
              {products && products.length > 0 && (
                <div>
                  총 <span>{products.length}</span>건의 컨텐츠
                </div>
              )}
            </>
          </TitleColumn>
          <Column>
            {loading ? (
              <Loader />
            ) : (
              <>
                {products &&
                  products.length > 0 &&
                  products.map((item, index) => (
                    <Link key={index} to={`/product/${item._id}`}>
                      <Content
                        id={`${item._id}`}
                        style={{
                          backgroundColor: `${
                            item._id === mouse
                              ? "rgba(233, 233, 233, 0.8)"
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
                            <Like>
                              <AiFillHeart style={{ marginRight: 3 }} />
                              {item.likes}
                            </Like>
                          </LikeAndView>
                        </Info>
                      </Content>
                    </Link>
                  ))}
              </>
            )}
          </Column>
          <PageColumn>
            <Pagination
              current={defaultPage}
              defaultCurrent={1}
              pageSize={5}
              onChange={(page) => onChangePage(page, filter, loadMap)}
              total={productsLen}
            />
          </PageColumn>
        </IndexSection>
      )}
    </Container>
  )
}

export default Find
