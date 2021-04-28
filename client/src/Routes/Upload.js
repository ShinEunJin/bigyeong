import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import FileUpload from "../Components/FileUpload"

const Container = styled.div`
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
`

const TEXTAREA = styled.textarea`
    width: 100%;
    height: 200px;
    border-radius: 5px;
    border: 1px solid gray;
    font-size: 1em;
`

const Button = styled.button`
    border-radius: 10px;
    border: 1px solid gray;
    font-size: 14px;
    width: 4rem;
    height: 2rem;
    cursor: pointer;
`

const Select = styled.select`
    border-radius: 5px;
    border: 1px solid gray;
    font-size: 1em;
    height: 2em;
`

function Upload(props) {

    const city = ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주도"]

    const [name, setName] = useState("")
    const [region, setRegion] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const [images, setImages] = useState([])

    const nameChangeHandler = e => {
        setName(e.target.value)
    }

    const regionChangeHandler = e => {
        setRegion(e.target.value)
    }

    const locationChangeHandler = e => {
        setLocation(e.target.value)
    }

    const descriptionChangeHandler = e => {
        setDescription(e.target.value)
    }

    const updateImages = newImages => {
        setImages(newImages)
    }

    const user = useSelector(state => state.user)

    const submitHandler = async e => {
        e.preventDefault()
        if (!name || !region || !location || !description || !images || region === "지역 선택") {
            return alert("빈 칸을 확인해 주시기 바랍니다.")
        }
        let body = { name, region, location, description, images, writer: user.userData._id }
        const {
            data: { success }
        } = await axios.post("/api/product", body)
        if (success) {
            props.history.push("/")
            setTimeout(() => {
                alert("상품 업로드에 성공 했습니다.")
            }, 500);
        } else {
            alert("상품 업로드에 실패 했습니다.")
        }
    }

    return (
        <Container>
            <FileUpload refreshFunction={updateImages} />
            <Form onSubmit={submitHandler}>
                <Label>제목</Label>
                <Input type="text" value={name} onChange={nameChangeHandler} />
                <br />
                <Label>지역</Label>
                <Select value={region} onChange={regionChangeHandler}>
                    <option value="지역 선택">지역 선택</option>
                    {city.map(item => (
                        <option value={item} key={item + "1"}>{item}</option>
                    ))}
                </Select>
                <br />
                <Label>위치</Label>
                <Input type="text" value={location} onChange={locationChangeHandler} />
                <br />
                <Label>설명</Label>
                <TEXTAREA value={description} onChange={descriptionChangeHandler}></TEXTAREA>
                <br />
                <Button type="submit">확인</Button>
            </Form>
        </Container>
    )
}

export default withRouter(Upload)
