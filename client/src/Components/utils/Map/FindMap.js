import React, { useEffect } from "react"

function FindMap({ updateMap, reloadMap, getProducts, updateMarkers }) {
  const loadKakaoMap = (lat, lng, level) => {
    const container = document.getElementById("kakao_map")
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level,
    }
    let map = new kakao.maps.Map(container, options)

    let mapTypeControl = new kakao.maps.MapTypeControl()
    let zoomControl = new kakao.maps.ZoomControl()
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT)
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)

    reloadMap(map)
    const geocoder = new kakao.maps.services.Geocoder()

    function searchDetailAddrFromCoords(coords, callback) {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback)
    }

    kakao.maps.event.addListener(map, "dragend", function () {
      searchDetailAddrFromCoords(map.getCenter(), (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          try {
            let area = map.getBounds()
            //지도가 작동했는지(false가 시작), default pagination, ui상에 지도 중심
            updateMap(false, 1, result[0].address)
            //상(pa) 우(oa) 하(qa) 좌(ha) 시계방향
            getProducts(area.pa, area.oa, area.qa, area.ha, 0)
            updateMarkers(map, area.pa, area.oa, area.qa, area.ha, 0)
          } catch (error) {
            console.log(error)
          }
        }
      })
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    loadKakaoMap(37.525, 126.734086, 9)
  }, [])

  return (
    <div
      id="kakao_map"
      style={{ width: "100%", height: "100%", border: "3px solid black" }}
    ></div>
  )
}

export default FindMap
