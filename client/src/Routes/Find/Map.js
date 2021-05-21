import React, { useEffect } from "react"
import styled from "styled-components"

const MapSection = styled.div`
  width: 50%;
  height: calc(100vh - 3rem);
  display: flex;
  position: relative;
  position: sticky;
  top: 3rem;
`

const KakaoMap = styled.div`
  width: 100%;
  height: 100%;
  border: 3px solid black;
`

function Map() {
  useEffect(() => {
    window.scrollTo(0, 0)
    const container = document.getElementById("kakao_map")
    const options = {
      center: new kakao.maps.LatLng(37.5642135, 127.0016985),
      level: 8,
    }
    let map = new kakao.maps.Map(container, options)
    const geocoder = new kakao.maps.services.Geocoder()

    let latlng = map.getCenter()

    map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP)

    function searchDetailAddrFromCoords(coords, callback) {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback)
    }

    let markers = []

    kakao.maps.event.addListener(map, "dragend", function () {
      setStart(false)
      latlng = map.getCenter()
      searchDetailAddrFromCoords(latlng, async (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          try {
            setAddress(result[0].address)
            setLoading(true)

            await getProducts(result[0].address.region_1depth_name, 3, 0)

            list = []

            for (let i = 0; i < markers.length; i++) {
              markers[i].setMap(null)
            }
            markers = []

            if (list && list.length > 0) {
              for (let i = 0; i < list.length; i++) {
                let lat = list[i].coord.Ma
                let lng = list[i].coord.La

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
          } catch (error) {
            console.log(error)
          } finally {
            setLoading(false)
          }
        }
      })
    })
  }, [])

  return (
    <MapSection>
      <KakaoMap id="kakao_map"></KakaoMap>
    </MapSection>
  )
}

export default Map
