import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Fade from "react-reveal/Fade"
import axios from "axios"
import { AiFillHeart, AiFillEye } from "react-icons/ai"
import { HeartFilled, CaretUpOutlined } from "@ant-design/icons"

const Container = styled.div`
  display: flex;
  margin-bottom: 4rem;
`

const InfoSection = styled.section`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  width: 60%;
  padding: 1rem;
  position: relative;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 1.1em;
  margin-bottom: 2rem;
`

const Address = styled.div`
  opacity: 0.8;
  margin-bottom: 2rem;
`

const WriterColumn = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`

const RealAvatar = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin-bottom: 0.5rem;
`

const Name = styled.div`
  font-weight: 600;
`

const Info = styled.div`
  font-size: 1.2em;
  font-weight: 600;
  display: flex;
`

const Like = styled.div`
  margin-right: 3rem;
  display: flex;
  align-items: center;
`

const ButtonColumn = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: flex;
`

const Button = styled.button`
  border-radius: 5px;
  width: 5rem;
  height: 2rem;
  border: none;
  cursor: pointer;
`

const Span = styled.span`
  font-size: 0.9em;
  font-weight: 600;
  opacity: 0.9;
`

function DetailInfo({ trigger }) {
  const {
    data: { product },
  } = useSelector((state) => state.product)

  const { userData } = useSelector((state) => state.user)

  const [like, setLike] = useState(0)
  const [alreadyLike, setAlreadyLike] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)

    setLike(product.likes)

    for (let like of userData.likes) {
      if (like === product._id) {
        setAlreadyLike(true)
        break
      }
    }

    const container = document.getElementById("kakao_map")
    const options = {
      center: new kakao.maps.LatLng(product.coord.Ma, product.coord.La),
      level: 6,
    }
    let markerPosition = new kakao.maps.LatLng(
      product.coord.Ma,
      product.coord.La
    )
    let map = new kakao.maps.Map(container, options)
    let mapTypeControl = new kakao.maps.MapTypeControl()
    let zoomControl = new kakao.maps.ZoomControl()
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT)
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)
    let marker = new kakao.maps.Marker({ position: markerPosition })
    marker.setMap(map)
    let content = '<div class="bAddr">' + product.address + "</div>"
    let infowindow = new kakao.maps.InfoWindow({
      zindex: 1,
    })
    infowindow.setContent(content)
    infowindow.open(map, marker)
  }, [product && product.coord])

  const onClickLikeBtn = async () => {
    if (!userData.isAuth) {
      alert("로그인이 필요한 서비스입니다.")
    } else {
      let body = {
        userId: userData._id,
        productId: product._id,
        alreadyLike,
      }
      const { data } = await axios.patch("/api/users/like", body)
      if (data.success === true) {
        setLike(data.like)
      }
      if (!alreadyLike) {
        setAlreadyLike(true)
      } else {
        setAlreadyLike(false)
      }
    }
  }

  return (
    <Container>
      <InfoSection>
        <Title>{product.name}</Title>
        <Address>
          {product.address} - {product.location}
        </Address>
        <WriterColumn>
          <RealAvatar src={product.writer.avatar} />
          <Name>{product.writer.name}</Name>
        </WriterColumn>
        <Info>
          <Like>
            <AiFillHeart style={{ color: "red", marginRight: "0.3rem" }} />{" "}
            {like}
          </Like>
          <Like>
            <AiFillEye style={{ marginRight: "0.3rem" }} /> {product.views}
          </Like>
        </Info>
        <ButtonColumn>
          <Button style={{ marginRight: "1rem", backgroundColor: "#80bfff" }}>
            <CaretUpOutlined
              style={{ marginRight: "0.2rem", color: "white" }}
            />
            <Span>찜하기</Span>
          </Button>
          <Button
            onClick={onClickLikeBtn}
            style={{ backgroundColor: "#ff8080" }}
          >
            <HeartFilled
              style={{
                marginRight: "0.2rem",
                color: `${alreadyLike ? "red" : "white"}`,
              }}
            />
            <Span>좋아요</Span>
          </Button>
        </ButtonColumn>
      </InfoSection>
      <Fade right when={trigger}>
        <div
          id="kakao_map"
          style={{
            width: 500,
            height: 400,
            borderRadius: 15,
            boxShadow: "1px 1px 7px 1px gray",
            marginLeft: 100,
          }}
        ></div>
      </Fade>
    </Container>
  )
}

export default DetailInfo
