import axios from "axios"
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import FileUpload from "../Components/FileUpload"

const Container = styled.div`
  padding-top: 100px;
  max-width: 1200px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`

const Form = styled.form`
  width: 80%;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Label = styled.label`
  font-size: 1em;
  opacity: 0.7;
  margin-bottom: 5px;
  margin-left: 5px;
`

const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  border: 1px solid gray;
  font-size: 1em;
  height: 2em;
  &::placeholder {
    opacity: 0.6;
  }
`

const TEXTAREA = styled.textarea`
  width: 100%;
  height: 200px;
  border-radius: 5px;
  border: 1px solid gray;
  font-size: 1em;
  &::placeholder {
    opacity: 0.6;
  }
`

const Button = styled.button`
  border-radius: 10px;
  border: 1px solid gray;
  font-size: 14px;
  width: 4rem;
  height: 2rem;
  cursor: pointer;
`

const MapSection = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
`

function Upload(props) {
  const [name, setName] = useState("")
  const [region1, setRegion1] = useState("")
  const [region2, setRegion2] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])
  const [address, setAddress] = useState("")
  const [coord, setCoord] = useState({})

  const nameChangeHandler = (e) => {
    setName(e.target.value)
  }

  const locationChangeHandler = (e) => {
    setLocation(e.target.value)
  }

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value)
  }

  const updateImages = (newImages) => {
    setImages(newImages)
  }

  const user = useSelector((state) => state.user)

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!name) return alert("제목을 확인해 주시기 바랍니다.")
    else if (!address) return alert("지도에서 해당 위치를 지정해 주십시오.")
    else if (!description) return alert("설명을 적어주시기 바랍니다.")
    else if (images.length === 0)
      return alert("한 장 이상의 사진이 필요합니다.")
    let body = {
      name,
      region1,
      region2,
      address,
      location,
      description,
      images,
      coord,
      writer: user.userData._id,
    }
    const {
      data: { success },
    } = await axios.post("/api/product", body)
    if (success) {
      props.history.push("/")
      setTimeout(() => {
        alert("상품 업로드에 성공 했습니다.")
      }, 500)
    } else {
      alert("상품 업로드에 실패 했습니다.")
    }
  }

  useEffect(() => {
    const container = document.getElementById("kakao_map")
    const options = {
      center: new kakao.maps.LatLng(36.5642135, 128.0016985),
      level: 13,
    }

    let map = new kakao.maps.Map(container, options)

    map.setMapTypeId(kakao.maps.MapTypeId.HYBRID)

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

          setRegion1(result[0].address.region_1depth_name)
          setRegion2(result[0].address.region_2depth_name)
          setAddress(result[0].address.address_name)
          setCoord(mouseEvent.latLng)

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

  return (
    <Container>
      <FileUpload refreshFunction={updateImages} />
      <Label
        style={{
          marginBottom: "1rem",
          paddingTop: "3rem",
          fontSize: "1.2em",
          fontWeight: 600,
          opacity: 0.9,
        }}
      >
        지도에서 해당 위치를 지정해 주십시오.
      </Label>

      <MapSection>
        <div id="kakao_map" style={{ width: "80%", height: "100%" }}></div>
      </MapSection>

      <Form onSubmit={submitHandler}>
        <Label>제목</Label>
        <Input
          type="text"
          placeholder="제목을 적어주십시오."
          defaultValue={name}
          onChange={nameChangeHandler}
        />
        <br />
        <Label>주소</Label>
        <Input
          type="text"
          placeholder="지도에서 해당 위치를 지정해 주십시오."
          value={address}
        />
        <br />
        <Label>위치</Label>
        <Input
          type="text"
          placeholder="선택 사항. 더 자세한 위치를 적어 주시면 됩니다."
          defaultValue={location}
          onChange={locationChangeHandler}
        />
        <br />
        <Label>설명</Label>
        <TEXTAREA
          placeholder="이 장소에 대해 자유롭게 설명해 주시기 바랍니다."
          defaultValue={description}
          onChange={descriptionChangeHandler}
        ></TEXTAREA>
        <br />
        <Button type="submit">확인</Button>
      </Form>
    </Container>
  )
}

export default withRouter(Upload)
