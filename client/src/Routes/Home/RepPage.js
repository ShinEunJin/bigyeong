import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Fade from "react-reveal/Fade"
import dotenv from "dotenv"
import Category from "./Category"

dotenv.config()

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 3rem);
  position: relative;
  display: flex;
  justify-content: center;
`

const Text = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 30%;
  left: 30%;
`

const Span = styled.span`
  display: block;
  margin-bottom: 10px;
  font-size: 2.3em;
  font-weight: 600;
  color: white;
`

const SLink = styled(Link)`
  color: rgba(235, 235, 235, 0.7);
  padding-left: 1rem;
  &:hover {
    color: rgba(245, 245, 245, 0.8);
  }
`

const Img = styled.img`
  width: 80%;
  height: calc(100vh - 3rem);
  object-fit: cover;
  object-position: center;
`

function RepPage() {
  return (
    <Container>
      <Text>
        <Fade top delay={500} distance="1rem">
          <Span style={{ paddingLeft: "1rem" }}>이 곳은</Span>
        </Fade>
        <Fade top delay={2000} distance="1rem">
          <Span style={{ marginBottom: "1rem" }}>어디일까요?</Span>
        </Fade>
        <Fade left delay={4000} distance="0.5rem" duration={200}>
          <SLink to="/register">확인하러 가기 →</SLink>
        </Fade>
      </Text>
      <Img src="/logo/repImages/good.jpg" />
      <Category />
    </Container>
  )
}

export default RepPage
