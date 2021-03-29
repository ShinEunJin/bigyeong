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
    margin-bottom: 100px;
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

function Upload(props) {

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const [images, setImages] = useState([])

    const nameChangeHandler = e => {
        setName(e.target.value)
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
        if (!name || !location || !description || !images) {
            return alert("빈 칸을 확인해 주시기 바랍니다.")
        }
        let body = { name, location, description, images, writer: user.userData._id }
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
                <Label>위치</Label>
                <Input type="text" value={location} onChange={locationChangeHandler} />
                <br />
                <Label>설명</Label>
                <TEXTAREA value={description} onChange={descriptionChangeHandler}></TEXTAREA>
                <br />
                <Button type="submit">업로드</Button>
            </Form>
        </Container>
    )
}

export default withRouter(Upload)
