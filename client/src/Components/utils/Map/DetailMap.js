import React, { useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import theme from "../../../hoc/theme"

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
    if (!isTabletOrLaptop) {
      let mapTypeControl = new kakao.maps.MapTypeControl()
      let zoomControl = new kakao.maps.ZoomControl()
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT)
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)
    }
    let marker = new kakao.maps.Marker({ position: markerPosition })
    marker.setMap(map)
    let content = '<div class="bAddr">' + product.address + "</div>"
    let infowindow = new kakao.maps.InfoWindow({
      zindex: 1,
    })
    infowindow.setContent(content)
    infowindow.open(map, marker)
  }, [])

  const isTabletOrLaptop = useMediaQuery({ query: theme.tablet })

  return (
    <div
      id="kakao_map"
      style={{
        width: isTabletOrLaptop ? "100%" : 500,
        height: isTabletOrLaptop ? 250 : 400,
        borderRadius: 15,
        boxShadow: "1px 1px 7px 1px gray",
        marginLeft: isTabletOrLaptop ? 0 : 100,
      }}
    ></div>
  )
}

export default DetailMap
