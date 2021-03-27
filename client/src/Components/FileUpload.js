import React, { useState } from 'react'
import styled from "styled-components"
import { FaPlus } from "react-icons/fa"
import Dropzone from "react-dropzone"
import axios from "axios"

const Container = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
`

const StyleDropZone = styled.div`
    width: 300px;
    height: 200px;
    border: 1px solid rgba(20, 20, 20, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const SFaPlus = styled(FaPlus)`
    font-size: 3em;
    color: rgba(30, 30, 30, 0.4);
`

function FileUpload(props) {

    const [images, setImages] = useState([])

    const onDropHandler = async (imageFile) => {
        let formData = new FormData()
        const config = {
            header: { "content-type": "multipart/form-data" }
        }
        formData.append("imageFile", imageFile[0])
        const {
            data: { filePath }
        } = await axios.post("/api/product/image", formData, config)
        if (filePath) {
            setImages([...images, filePath])
        } else {
            alert("이미지를 저장하는데 실패했습니다.")
        }
    }

    return (
        <Container>
            <Dropzone onDrop={onDropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <StyleDropZone {...getRootProps()}>
                            <input {...getInputProps()} />
                            <SFaPlus />
                        </StyleDropZone>
                    </section>
                )}
            </Dropzone>
            <div>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={`http://localhost:6000/${image}`} />
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default FileUpload
