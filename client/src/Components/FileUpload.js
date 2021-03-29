import React, { useState } from 'react'
import styled from "styled-components"
import { FaPlus } from "react-icons/fa"
import Dropzone from "react-dropzone"
import axios from "axios"

const Container = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const StyleDropZone = styled.div`
    width: 150px;
    height: 100px;
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

const ImageZone = styled.div`
    display: flex;
    width: 600px;
    overflow-x: scroll;
`

const Img = styled.img`
    min-width: 550px;
    height: 450px;
    width: 550px;
    object-position: center;
`

function FileUpload(props) {

    const [images, setImages] = useState([])

    //이미지 파일만 올릴 수 있게 만들기
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
            props.refreshFunction([...images, filePath])
        } else {
            alert("이미지를 저장하는데 실패했습니다.")
        }
    }

    const deleteHandler = image => {
        const currentIndex = images.indexOf(image)
        let newImages = [...images]
        newImages.splice(currentIndex, 1)
        setImages(newImages)
        props.refreshFunction(newImages)
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
            <ImageZone>
                {images.map((image, index) => (
                    <div onClick={() => deleteHandler(image)} key={index}>
                        <Img src={`http://localhost:5000/${image}`} />
                    </div>
                ))}
            </ImageZone>
        </Container>
    )
}

export default FileUpload
