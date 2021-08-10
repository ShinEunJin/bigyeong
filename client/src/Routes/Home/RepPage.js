import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Fade from "react-reveal/Fade"
import Category from "./Category"
import Loader from "../../Components/Loading"
import routes from "../../routes"
import device from "../../hoc/theme" //theme가 중복되어서 device로 사용
import { useMediaQuery } from "react-responsive"

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
  @media ${(props) => props.theme.laptop} {
    position: absolute;
    top: 5%;
    left: 40%;
  }
`

const Span = styled.span`
  display: block;
  margin-bottom: 10px;
  font-size: 2.3em;
  font-weight: 600;
  color: white;
  @media ${(props) => props.theme.laptop} {
    font-size: 0.9em;
    font-weight: 400;
    margin-bottom: 2px;
  }
`

const SLink = styled(Link)`
  color: rgba(235, 235, 235, 0.7);
  padding-left: 1rem;
  &:hover {
    color: rgba(245, 245, 245, 0.8);
  }
  @media ${(props) => props.theme.laptop} {
    font-size: 0.9em;
  }
`

const Img = styled.img`
  height: calc(100vh -3rem);
  width: 80%;
  object-fit: contain;
  object-position: center;
  @media ${(props) => props.theme.laptop} {
    object-fit: cover;
    object-position: center;
    width: 80%;
    height: 90vh;
  }
`

function RepPage({ theme }) {
  const { repProduct, loading } = useSelector((state) => state.product)

  const [fade, setFade] = useState(false)

  const isMobileOrLaptop = useMediaQuery({ query: device.mobile })

  useEffect(() => {
    if (!loading) {
      setFade(true)
    }
  }, [repProduct])

  return (
    <Container>
      <Text theme={theme}>
        <Fade
          when={fade}
          top
          delay={1600}
          distance={isMobileOrLaptop ? "0.2rem" : "1rem"}
        >
          <Span theme={theme} style={{ paddingLeft: "1rem" }}>
            이곳은
          </Span>
        </Fade>
        <Fade
          when={fade}
          top
          delay={2200}
          distance={isMobileOrLaptop ? "0.2rem" : "1rem"}
        >
          <Span theme={theme} style={{ marginBottom: "1rem" }}>
            어디일까요?
          </Span>
        </Fade>
        <Fade when={fade} left delay={4000} distance="0.5rem" duration={200}>
          <SLink to={routes.product(repProduct && repProduct._id)}>
            확인하러 가기 →
          </SLink>
        </Fade>
      </Text>
      {loading ? (
        <Loader />
      ) : (
        <Img theme={theme} src={repProduct && repProduct.images[0]} />
      )}
      <Category theme={theme} time={fade} />
    </Container>
  )
}

export default RepPage
