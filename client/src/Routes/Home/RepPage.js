import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Fade from "react-reveal/Fade"
import Category from "./Category"
import Loader from "../../Components/Loading"
import routes from "../../routes"

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
  height: calc(100vh -3rem);
  width: 80%;
  object-fit: contain;
  object-position: center;
`

function RepPage() {
  const { repProduct, loading } = useSelector((state) => state.product)

  const [fade, setFade] = useState(false)

  useEffect(() => {
    if (!loading) {
      setFade(true)
    }
  }, [repProduct])

  return (
    <Container>
      <Text>
        <Fade when={fade} top delay={1600} distance="1rem">
          <Span style={{ paddingLeft: "1rem" }}>이곳은</Span>
        </Fade>
        <Fade when={fade} top delay={2200} distance="1rem">
          <Span style={{ marginBottom: "1rem" }}>어디일까요?</Span>
        </Fade>
        <Fade when={fade} left delay={4000} distance="0.5rem" duration={200}>
          <SLink to={routes.product(repProduct && repProduct._id)}>
            확인하러 가기 →
          </SLink>
        </Fade>
      </Text>
      {loading ? <Loader /> : <Img src={repProduct && repProduct.images[0]} />}
      <Category time={fade} />
    </Container>
  )
}

export default RepPage
