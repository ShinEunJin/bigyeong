import React from "react"
import Loader from "react-loader-spinner"
import styled from "styled-components"

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 3rem);
  display: flex;
  justify-content: center;
  align-items: center;
`

function Loading() {
  return (
    <Container>
      <Loader
        type="Oval"
        color="#393e46"
        height={70}
        width={70}
        timeout={3000}
      />
    </Container>
  )
}

export default Loading
