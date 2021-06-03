import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Fade from "react-reveal/Fade"

function DetailInfo({ trigger }) {
  const {
    data: { product },
  } = useSelector((state) => state.product)

  useEffect(() => {
    window.scrollTo(0, 0)
    const container = document.getElementById("kakao_map")
    const options = {
      center: new kakao.maps.LatLng(product.coord.Ma, product.coord.La),
      level: 7,
    }
    let markerPosition = new kakao.maps.LatLng(
      product.coord.Ma,
      product.coord.La
    )
    let map = new kakao.maps.Map(container, options)
    let mapTypeControl = new kakao.maps.MapTypeControl()
    let zoomControl = new kakao.maps.ZoomControl()
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT)
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)
    let marker = new kakao.maps.Marker({ position: markerPosition })
    marker.setMap(map)
    let content = '<div class="bAddr">' + product.address + "</div>"
    let infowindow = new kakao.maps.InfoWindow({
      zindex: 1,
    })
    infowindow.setContent(content)
    infowindow.open(map, marker)
  }, [product && product.coord])

  return (
    <div style={{ display: "flex" }}>
      <Fade left when={trigger}>
        <div
          id="kakao_map"
          style={{
            width: 500,
            height: 400,
            borderRadius: 15,
            boxShadow: "1px 1px 7px 1px gray",
            marginRight: 100,
          }}
        ></div>
      </Fade>
      <Fade right when={trigger}>
        <div
          style={{
            width: 900,
            height: 400,
            borderRadius: 15,
            backgroundColor: "white",
            boxShadow: "1px 1px 7px 1px gray",
          }}
        >
          {product.name}
        </div>
      </Fade>
    </div>
  )
}

export default DetailInfo
