import React, { useEffect, useState } from "react"
import styled from "styled-components"
import dotenv from "dotenv"
import { Link } from "react-router-dom"
import axios from "axios"

dotenv.config()

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #faf3f3;
  display: flex;
`

const MapSection = styled.div`
  width: 50%;
  height: 100vh;
  display: flex;
  position: relative;
`

const IndexSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  width: 45%;
`

const Content = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  margin-bottom: 1rem;
`

const Img = styled.img`
  width: 45%;
  min-width: 22rem;
  height: 13rem;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
`

const Info = styled.div`
  width: 45%;
  padding: 1rem;
  position: relative;
`

const Title = styled.div`
  font-size: 1.2em;
  margin-bottom: 1rem;
`

const Address = styled.div`
  opacity: 0.6;
`

const LikeAndView = styled.div`
  display: flex;
  font-size: 0.9em;
  position: absolute;
  bottom: 0;
`

const View = styled.div`
  margin-right: 0.5rem;
`

const Like = styled.div``

function Find() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    const container = document.getElementById("kakao_map")
    const options = {
      center: new kakao.maps.LatLng(37.5642135, 127.0016985),
      level: 10,
    }
    const geocoder = new kakao.maps.services.Geocoder()

    let map = new kakao.maps.Map(container, options)
    let latlng = map.getCenter()

    map.setMapTypeId(kakao.maps.MapTypeId.HYBRID)

    function searchDetailAddrFromCoords(coords, callback) {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback)
    }

    let markers = []

    kakao.maps.event.addListener(map, "dragend", function () {
      latlng = map.getCenter()
      searchDetailAddrFromCoords(latlng, async (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const { data } = await axios.get(
            `/api/product/products?filters=${result[0].address.region_1depth_name}`
          )
          setProducts(data.product)
          for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null)
          }
          markers = []
          if (data.product && data.product.length > 0) {
            for (let i = 0; i < data.product.length; i++) {
              let lat = data.product[i].coord.Ma
              let lng = data.product[i].coord.La

              let markerPosition = new kakao.maps.LatLng(lat, lng)

              let marker = new kakao.maps.Marker({
                position: markerPosition,
              })
              markers.push(marker)
            }
            for (let i = 0; i < markers.length; i++) {
              markers[i].setMap(map)
            }
          }
        }
      })
    })
  }, [])

  return (
    <Container>
      <MapSection>
        <div id="kakao_map" style={{ width: "100%", height: "100vh" }}></div>
      </MapSection>
      <IndexSection>
        {products &&
          products.length > 0 &&
          products.map((item, index) => (
            <Link to={`/product/${item._id}`}>
              <Content key={index}>
                <Img src={item.images[0]} />
                <Info>
                  <Title>{item.name}</Title>
                  <Address>{item.address}</Address>
                  <Address>{item.location}</Address>
                  <LikeAndView>
                    <View>조회수: {item.views}</View>
                    <Like>좋아요: {item.likes}</Like>
                  </LikeAndView>
                </Info>
              </Content>
            </Link>
          ))}
      </IndexSection>
    </Container>
  )
}

export default Find
