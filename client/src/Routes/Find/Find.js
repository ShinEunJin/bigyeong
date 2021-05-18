import React, { useEffect, useState } from "react"
import styled from "styled-components"
import dotenv from "dotenv"
import { Link } from "react-router-dom"

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
  useEffect(() => {
    const container = document.getElementById("kakao_map")
    const options = {
      center: new kakao.maps.LatLng(37.5642135, 127.0016985),
      level: 10,
    }

    let map = new kakao.maps.Map(container, options)
    map.setMapTypeId(kakao.maps.MapTypeId.HYBRID)
  }, [])

  /* const onClickHandler = (e) => {
    console.log(e)
  } */

  return (
    <Container>
      <MapSection>
        <div
          /* onClick={onClickHandler} */
          id="kakao_map"
          style={{ width: "50%", height: "100vh" }}
        ></div>
      </MapSection>
    </Container>
  )
}

export default Find
