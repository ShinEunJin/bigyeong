import React, { useState } from 'react'
import styled from "styled-components"
import FileUpload from "../Components/FileUpload"

const Container = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`

function Upload(props) {

    const [name, setName] = useState("")
    const [place, setPlace] = useState("")
    const [place2, setPlace2] = useState("")
    const [description, setDescription] = useState("")
    const [images, setImages] = useState([])

    const nameChangeHandler = e => {
        setName(e.target.value)
    }

    const updateImages = newImages => {
        setImages(newImages)
    }

    return (
        <Container>
            <FileUpload refreshFunction={updateImages} />
            <form>
                <input type="text" placeholder="name" value={name} onChange={nameChangeHandler} />
                <br />
                <br />
                <input type="text" placeholder="place1" />
                <br />
                <br />
                <input type="text" placeholder="place2" />
                <br />
                <br />
                <textarea placeholder="description"></textarea>
                <br />
                <br />
                <button type="submit">업로드</button>
            </form>
        </Container>
    )
}

export default Upload
