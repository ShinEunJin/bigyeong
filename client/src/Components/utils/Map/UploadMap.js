import React, { useEffect } from "react"

function UploadMap({ updateMap }) {
  useEffect(() => {
    const container = document.getElementById("kakao_map")
    const options = {
      center: new kakao.maps.LatLng(36.5642135, 128.0016985),
      level: 13,
    }

    let map = new kakao.maps.Map(container, options)

    let mapTypeControl = new kakao.maps.MapTypeControl()
    let zoomControl = new kakao.maps.ZoomControl()
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT)
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)

    let marker = new kakao.maps.Marker()

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var detailAddr = !!result[0].road_address
            ? "<div>도로명주소 : " +
              result[0].road_address.address_name +
              "</div>"
            : ""
          detailAddr +=
            "<div>지번 주소 : " + result[0].address.address_name + "</div>"

          updateMap(
            result[0].address.region_1depth_name,
            result[0].address.region_2depth_name,
            result[0].address.address_name,
            mouseEvent.latLng
          )

          var content =
            '<div class="bAddr">' +
            '<span class="title">법정동 주소정보</span>' +
            detailAddr +
            "</div>"

          marker.setPosition(mouseEvent.latLng)
          marker.setMap(map)

          infowindow.setContent(content)
          infowindow.open(map, marker)
        }
      })
    })
    const infowindow = new kakao.maps.InfoWindow({ zindex: 1 })
    const geocoder = new kakao.maps.services.Geocoder()
    function searchDetailAddrFromCoords(coords, callback) {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback)
    }
  }, [])

  return <div id="kakao_map" style={{ width: "80%", height: "100%" }}></div>
}

export default UploadMap
