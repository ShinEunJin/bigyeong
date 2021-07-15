import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import Fade from "react-reveal/Fade"
import { AiFillEye } from "react-icons/ai"
import { CaretUpOutlined } from "@ant-design/icons"
import { updateUserTake } from "../../_actions/user_action"
import Map from "../../Components/utils/Map/DetailMap"
import DetailRevise from "./DetailRevise"
import axios from "axios"
import routes from "../../routes"
import Report from "../../Components/utils/Report"

const Container = styled.div`
  display: flex;
  margin-bottom: 4rem;
`

const MapSection = styled.div``

const InfoSection = styled.section`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  width: 60%;
  height: 45vh;
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
  color: whitesmoke;
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

const View = styled.div`
  margin-right: 3rem;
  display: flex;
  align-items: center;
  font-size: 1.2em;
  font-weight: 600;
  margin-bottom: 1rem;
`

const ReportColumn = styled.div`
  margin-right: 2rem;
  display: flex;
  align-items: center;
  font-size: 1.2em;
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

const Description = styled.div`
  width: 70%;
`

const ShowMoreBtn = styled.button`
  opacity: 0.6;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: black;
`

function DetailInfo({ trigger }) {
  const dispatch = useDispatch()

  const { product } = useSelector((state) => state.product)

  const { userData } = useSelector((state) => state.user)

  const [alreadyTake, setAlreadyTake] = useState(false)
  const [showMore, setShowMore] = useState(235)

  const showMoreBtn = useRef()

  useEffect(() => {
    if (userData.take && userData.take.length > 0) {
      for (let take of userData.take) {
        if (take === product._id) {
          setAlreadyTake(true)
          break
        }
      }
    }
  }, [])

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

  const pushRepProduct = async () => {
    let body = { productId: product._id }
    try {
      const { data } = await axios.patch(routes.apiPRoductRepresent, body)
      if (data.success) alert("성공")
    } catch (error) {
      alert("대표 사진 실패!")
    }
  }

  const onClickShowMore = () => {
    setShowMore(720)
    showMoreBtn.current.innerText = ""
  }

  return (
    <Container>
      <InfoSection>
        {/* 제목 */}
        <Title>{product.name}</Title>
        {/* 주소 */}
        <Address>
          {product.address} {product && product.location && "-"}{" "}
          {product.location}
        </Address>
        {/* 조회수 및 관리자(role = 3)만 볼 수 있는 버튼 */}
        <WriterColumn>
          {userData && userData.role === 3 && (
            <Button style={{ color: "black" }} onClick={pushRepProduct}>
              대표 사진 설정하기
            </Button>
          )}
          <View>
            <AiFillEye style={{ marginRight: "0.3rem" }} /> {product.views}
          </View>
          <ReportColumn>
            <Report report={{ category: "product", id: product._id }} />
          </ReportColumn>
        </WriterColumn>
        {/* 로그인한 사람은 찜하기 버튼 볼 수 있고 자기가 올린 컨텐츠에는 수정하기 삭제하기 버튼 있음 둘 다 아니면 아무 것도 안보임 */}
        {userData.isAuth ? (
          product.writer && userData._id === product.writer._id ? (
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
            </ButtonColumn>
          )
        ) : (
          <></>
        )}
        {/* 설명란 및 더보기 버튼 */}
        <Description>
          {product.description.substr(0, showMore)}
          {product.description && product.description.length > 235 && (
            <ShowMoreBtn ref={showMoreBtn} onClick={onClickShowMore}>
              ...더보기
            </ShowMoreBtn>
          )}
        </Description>
      </InfoSection>
      {/* 지도 부분 */}
      <MapSection>
        <Fade right distance="3rem" when={trigger}>
          <Map product={product} />
        </Fade>
      </MapSection>
    </Container>
  )
}

export default DetailInfo
