import React, { useState, useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import FileUpload from "../../Components/utils/FileUpload"
import Map from "../../Components/utils/Map/UploadMap"

const Container = styled.div`
  padding-top: 100px;
  max-width: 1200px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
  color: black;
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

  const updateMap = (region1, region2, address, coord) => {
    setRegion1(region1)
    setRegion2(region2)
    setAddress(address)
    setCoord(coord)
  }

  const user = useSelector((state) => state.user)
  const { product } = useSelector((state) => state.product)

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
      //coord는 만약 지도를 선택하지 않고 업데이트하면 원래 좌표 coord.lat로 저장되고
      //지도를 선택한다면 카카오 맵 좌표인 coord.Ma가 저장되도록 해준다.
      coord: {
        lat: coord.Ma ? coord.Ma : coord.lat,
        lng: coord.La ? coord.La : coord.lng,
      },
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
        <Map updateMap={updateMap} nowCoord={product.coord} />
      </MapSection>

      <Form onSubmit={submitHandler}>
        <Label>제목</Label>
        <Input
          maxLength={100}
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
          maxLength={100}
          type="text"
          placeholder="선택 사항. 더 자세한 위치를 적어 주시면 됩니다."
          defaultValue={product.location}
          onChange={locationChangeHandler}
        />
        <br />
        <Label>설명</Label>
        <TEXTAREA
          maxLength={700}
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
