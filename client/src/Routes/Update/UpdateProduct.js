import React, { useState, useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import FileUpload from "../../Components/FileUpload"

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
  width: 6rem;
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

function UpdateProduct(props) {
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
  const {
    data: { product },
  } = useSelector((state) => state.product)

  const submitHandler = async (e) => {
    e.preventDefault()
    let updateInfo = {
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
    } = await axios.patch("/api/product", {
      updateInfo,
      productId: product._id,
    })
    if (success) {
      props.history.push("/")
      setTimeout(() => {
        alert("컨텐츠 수정에 성공 했습니다.")
      }, 500)
    } else {
      alert("컨텐츠 수정에 실패 했습니다.")
    }
  }

  useEffect(() => {
    setName(product.name)
    setLocation(product.location)
    setDescription(product.description)
    setRegion1(product.region1)
    setRegion2(product.region2)
    setAddress(product.address)
    setCoord(product.coord)

    const container = document.getElementById("kakao_map")
    const options = {
      center: new kakao.maps.LatLng(product.coord.Ma, product.coord.La),
      level: 7,
    }

    let map = new kakao.maps.Map(container, options)

    let markerPosition = new kakao.maps.LatLng(
      product.coord.Ma,
      product.coord.La
    )

    let marker = new kakao.maps.Marker({ position: markerPosition })
    marker.setMap(map)

    let mapTypeControl = new kakao.maps.MapTypeControl()
    let zoomControl = new kakao.maps.ZoomControl()
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT)
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var detailAddr = !!result[0].road_address
            ? "<div><span class='bAddr'>도로명주소<span> : " +
              result[0].road_address.address_name +
              "</div>"
            : ""
          detailAddr +=
            "<div><span class='bAddr_info'>지번 주소</span> : " +
            result[0].address.address_name +
            "</div>"

          setRegion1(result[0].address.region_1depth_name)
          setRegion2(result[0].address.region_2depth_name)
          setAddress(result[0].address.address_name)
          setCoord(mouseEvent.latLng)

          var content = '<div class="bAddr">' + detailAddr + "</div>"

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
  }, [product])

  return (
    <Container>
      <FileUpload refreshFunction={updateImages} updatePage={product.images} />
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
          defaultValue={product.name}
          onChange={nameChangeHandler}
        />
        <br />
        <Label>주소</Label>
        <Input
          type="text"
          placeholder="지도에서 해당 위치를 지정해 주십시오."
          value={address}
          readOnly
        />
        <br />
        <Label>위치</Label>
        <Input
          type="text"
          placeholder="선택 사항. 더 자세한 위치를 적어 주시면 됩니다."
          defaultValue={product.location}
          onChange={locationChangeHandler}
        />
        <br />
        <Label>설명</Label>
        <TEXTAREA
          placeholder="이 장소에 대해 자유롭게 설명해 주시기 바랍니다."
          defaultValue={product.description}
          onChange={descriptionChangeHandler}
        ></TEXTAREA>
        <br />
        <Button type="submit">수정하기</Button>
      </Form>
    </Container>
  )
}

export default withRouter(UpdateProduct)
