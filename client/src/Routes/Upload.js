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

    const [Images, setImages] = useState([])

    const uploadImages = (newImages) => {
        setImages(newImages)
    }

    return (
        <Container>
            <FileUpload refreshFunction={uploadImages} />
            <form>
                <input type="text" placeholder="name" />
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
