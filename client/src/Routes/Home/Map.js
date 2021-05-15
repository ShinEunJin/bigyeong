import React, { useEffect, useState } from "react"
import styled from "styled-components"
import dotenv from "dotenv"
import { Link } from "react-router-dom"

dotenv.config()

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  padding-top: 3rem;
  background-color: #faf3f3;
`

const MapSection = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
`

function Map() {
  useEffect(() => {
    const container = document.getElementById("kakao_map")
    const options = {
      center: new kakao.maps.LatLng(35.6, 128.1),
      level: 12,
    }

    let kakaoMap = new kakao.maps.Map(container, options)
    kakaoMap.setMapTypeId(kakao.maps.MapTypeId.HYBRID)
  }, [])

  return (
    <Container id="map">
      <MapSection>
        <div
          id="kakao_map"
          style={{ width: "50%", height: "calc(100vh - 3rem)" }}
        ></div>
      </MapSection>
    </Container>
  )
}

export default Map
