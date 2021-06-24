import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { MdAddToPhotos } from "react-icons/md"
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
  color: white;
`

const StyleDropZone = styled.div`
  width: 150px;
  height: 100px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const SMdAddToPhotos = styled(MdAddToPhotos)`
  font-size: 3em;
  color: rgba(255, 255, 255, 0.6);
`

const ImageZone = styled.div`
  display: flex;
  width: 34vw;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 0.7rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    border: 1px solid white;
    border-radius: 10px;
  }
`

const Img = styled.img`
  min-width: 30vw;
  height: 40vh;
  width: 30vw;
  object-position: center;
  cursor: pointer;
`

const EmptyImg = styled.div`
  width: 30vw;
  height: 42vh;
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
              <SMdAddToPhotos />
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
                  이미지를 업로드 하기 위해 옆에{" "}
                  <MdAddToPhotos style={{ marginLeft: 5 }} /> 버튼을
                  눌러주십시오.
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
