import React from 'react'
import styled from "styled-components"

const Container = styled.div`
    width: 75%;
    margin: 0 auto;
    height: 70vh;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const VideoContainer = styled.div`
    width: 1200px;
    height: 720px;
    background-color: rgba(50, 50, 50, 0.8);
    margin-bottom: 30px;
`

const PlayBtn = styled.button`
    width: 100px;
    height: 40px;
    border-radius: 10px;
    outline: none;
    background-color: #880e4f;
    font-weight: 600;
    color: white;
    cursor: pointer;
`

function Record() {

    const onRecordHandler = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                audio: true,
                video: { width: 1200, height: 720 }
            })
            const video = document.querySelector("video")
            video.srcObject = stream
            video.play()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <VideoContainer>
                <video></video>
            </VideoContainer>
            <PlayBtn onClick={onRecordHandler}>스트리밍</PlayBtn>
        </Container>
    )
}

export default Record
