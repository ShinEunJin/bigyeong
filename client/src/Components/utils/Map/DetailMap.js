import React, { useEffect } from "react"

function DetailMap({ product }) {
  useEffect(() => {
    const container = document.getElementById("kakao_map")
    const options = {
      center: new kakao.maps.LatLng(product.coord.lat, product.coord.lng),
      level: 6,
    }
    let markerPosition = new kakao.maps.LatLng(
      product.coord.lat,
      product.coord.lng
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
  }, [])

  return (
    <div
      id="kakao_map"
      style={{
        width: 500,
        height: 400,
        borderRadius: 15,
        boxShadow: "1px 1px 7px 1px gray",
        marginLeft: 100,
      }}
    ></div>
  )
}

export default DetailMap
