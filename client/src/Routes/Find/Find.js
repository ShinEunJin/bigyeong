import React, { useEffect, useState } from "react"
import styled from "styled-components"
import dotenv from "dotenv"
import { Link } from "react-router-dom"
import axios from "axios"

dotenv.config()

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  background-color: #faf3f3;
`

const MapSection = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
`

function Find() {
  const [products, setProducts] = useState([])

  useEffect(() => {
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

    searchDetailAddrFromCoords(latlng, async (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const { data } = await axios.get(
          `/api/product/products?filters=${result[0].address.region_2depth_name}`
        )
      }
    })

    let markers = []

    kakao.maps.event.addListener(map, "dragend", function () {
      latlng = map.getCenter()
      searchDetailAddrFromCoords(latlng, async (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const { data } = await axios.get(
            `/api/product/products?filters=${result[0].address.region_1depth_name}`
          )
          setProducts(data.product)
          console.log(markers)
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
        <div id="kakao_map" style={{ width: "50%", height: "100vh" }}></div>
        <div>{products && products.length > 0 && products[0].region1}</div>
      </MapSection>
    </Container>
  )
}

export default Find
