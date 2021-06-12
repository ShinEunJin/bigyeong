import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import Fade from "react-reveal/Fade"
import { AiFillHeart, AiFillEye } from "react-icons/ai"
import { HeartFilled, CaretUpOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar as NoAvatar } from "antd"
import { updateUserTake, updateUserLike } from "../../_actions/user_action"
import { updateProductLike } from "../../_actions/product_action"
import DetailRevise from "./DetailRevise"
import dotenv from "dotenv"
import { Link } from "react-router-dom"

dotenv.config()

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
  width: 60%;
  line-height: 1.2em;
  overflow-wrap: break-word;
`

const Address = styled.div`
  width: 60%;
  opacity: 0.8;
  line-height: 1.2em;
  margin-bottom: 2rem;
  overflow-wrap: break-word;
`

const WriterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 20%;
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
  const dispatch = useDispatch()

  const { product } = useSelector((state) => state.product)

  const { userData } = useSelector((state) => state.user)

  const [alreadyLike, setAlreadyLike] = useState(false)
  const [alreadyTake, setAlreadyTake] = useState(false)

  useEffect(() => {
    if (userData.likes && userData.likes.length > 0) {
      for (let like of userData.likes) {
        if (like === product._id) {
          setAlreadyLike(true)
          break
        }
      }
    }

    if (userData.take && userData.take.length > 0) {
      for (let take of userData.take) {
        if (take === product._id) {
          setAlreadyTake(true)
          break
        }
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
  }, [])

  const onClickLikeBtn = async () => {
    if (!userData.isAuth) {
      alert("로그인이 필요한 서비스입니다.")
    } else {
      let body = {
        userId: userData._id,
        productId: product._id,
        alreadyLike,
      }
      dispatch(updateUserLike(body))
      dispatch(updateProductLike(body))
      if (alreadyLike) {
        setAlreadyLike(false)
      } else {
        setAlreadyLike(true)
      }
    }
  }

  const onClickTakeBtn = async () => {
    if (!userData.isAuth) {
      alert("로그인이 필요한 서비스입니다.")
    } else {
      if (alreadyTake) {
        alert("이미 찜목록에 등록되어 있습니다.")
      } else {
        let body = {
          userId: userData._id,
          productId: product._id,
          add: true,
        }
        dispatch(updateUserTake(body))
        alert("찜목록에 등록하였습니다.")
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
          {product.writer && product.writer.avatar ? (
            <Link to={`/user/profile/${product.writer._id}`}>
              <RealAvatar
                src={
                  process.env.NODE_ENV === "development"
                    ? `http://localhost:5000/${product.writer.avatar}`
                    : product.writer.avatar
                }
              />
            </Link>
          ) : (
            <Link to={`/user/profile/${product.writer._id}`}>
              <NoAvatar
                style={{ marginBottom: "0.5rem" }}
                size={48}
                icon={<UserOutlined />}
              />
            </Link>
          )}
          <Name>{product.writer.name}</Name>
        </WriterColumn>
        <Info>
          <Like>
            <AiFillHeart style={{ color: "red", marginRight: "0.3rem" }} />{" "}
            {product.likes}
          </Like>
          <Like>
            <AiFillEye style={{ marginRight: "0.3rem" }} /> {product.views}
          </Like>
        </Info>
        {product.writer && userData._id === product.writer._id ? (
          <DetailRevise />
        ) : (
          <ButtonColumn>
            <Button
              onClick={onClickTakeBtn}
              style={{ marginRight: "1rem", backgroundColor: "#80bfff" }}
            >
              <CaretUpOutlined
                style={{
                  marginRight: "0.2rem",
                  color: `${alreadyTake ? "blue" : "white"}`,
                }}
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
        )}
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
