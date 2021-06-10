import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FaPlus } from "react-icons/fa"
import Dropzone from "react-dropzone"
import axios from "axios"
import Loader from "react-loader-spinner"
import dotenv from "dotenv"

dotenv.config()

const Container = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 50px;
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

const EmptyImg = styled.div`
  width: 550px;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  opacity: 0.6;
`

function FileUpload(props) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (props.updatePage) {
      setImages(props.updatePage)
      props.refreshFunction([...props.updatePage])
    }
  }, [])

  const onDropHandler = async (imageFile) => {
    try {
      setLoading(true)
      let formData = new FormData()
      const config = {
        header: { "content-type": "multipart/form-data" },
      }
      formData.append("imageFile", imageFile[0])
      const {
        data: { filePath },
      } = await axios.post("/api/product/image", formData, config)
      if (filePath) {
        setImages([...images, filePath])
        props.refreshFunction([...images, filePath])
      }
    } catch (error) {
      alert("이미지를 업로드 하는데 실패 하였습니다.")
    } finally {
      setLoading(false)
    }
  }

  const deleteHandler = (image) => {
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
      {loading ? (
        <EmptyImg>
          사진을 업로드 중입니다. 잠시만 기다려 주십시오.
          <Loader
            type="Oval"
            color="#393e46"
            height={20}
            width={20}
            timeout={3000}
          />
        </EmptyImg>
      ) : (
        <>
          {props.getImages && props.getImages.length > 0 ? (
            <ImageZone>
              {props.getImages.map((image, index) => (
                <div onClick={() => deleteHandler(image)} key={index}>
                  <Img
                    src={
                      process.env.NODE_ENV === "development"
                        ? `http://localhost:5000/${image}`
                        : image
                    }
                  />
                </div>
              ))}
            </ImageZone>
          ) : (
            <ImageZone>
              {images.length === 0 ? (
                <EmptyImg>
                  이미지를 업로드 하기 위해 옆에 + 버튼을 눌러주십시오.
                </EmptyImg>
              ) : (
                images.map((image, index) => (
                  <div onClick={() => deleteHandler(image)} key={index}>
                    <Img
                      src={
                        process.env.NODE_ENV === "development"
                          ? `http://localhost:5000/${image}`
                          : image
                      }
                    />
                  </div>
                ))
              )}
            </ImageZone>
          )}
        </>
      )}
    </Container>
  )
}

export default FileUpload
