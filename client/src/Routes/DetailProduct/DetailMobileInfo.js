import React, { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { AiFillEye } from "react-icons/ai"
import Report from "../../Components/utils/Report"
import Map from "../../Components/utils/Map/DetailMap"
import DetailRevise from "./DetailRevise"
import { CaretUpOutlined } from "@ant-design/icons"
import { updateUserTake } from "../../_actions/user_action"

const Container = styled.div`
  width: 100%;
  margin-bottom: 4rem;
`

const TopColumn = styled.section``

const Title = styled.div`
  margin-bottom: 1rem;
  font-weight: 600;
`

const MiddleColumn = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem; ;
`

const View = styled.div``

const BottomColumn = styled.section`
  margin-bottom: 2rem;
`

const ButtonColumn = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  @media ${(props) => props.theme.tablet} {
    position: unset;
    padding-top: 5vh;
  }
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

const Address = styled.div`
  opacity: 0.8;
  line-height: 1.2em;
  margin-bottom: 1rem;
  overflow-wrap: break-word;
`

const Description = styled.div`
  opacity: 0.9;
`

const ShowMoreBtn = styled.button`
  opacity: 0.6;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: black;
`

const MapColumn = styled.section``

function DetailMobileInfo({ trigger }) {
  const dispatch = useDispatch()

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

  const { product } = useSelector((state) => state.product)
  const { userData } = useSelector((state) => state.user)

  const [alreadyTake, setAlreadyTake] = useState(false)
  const [showMore, setShowMore] = useState(80)

  const showMoreBtn = useRef()

  const onClickShowMore = () => {
    setShowMore(720)
    showMoreBtn.current.innerText = ""
  }

  return (
    <Container>
      <TopColumn>
        <Title>{product.name}</Title>
      </TopColumn>
      <MiddleColumn>
        <View>
          <AiFillEye />
          {product.views}
        </View>
        <Report report={{ category: "product", id: product._id }} />
      </MiddleColumn>
      <BottomColumn>
        <Address>{product.address}</Address>
        <Description>
          {product.description.substr(0, showMore)}
          {product.description && product.description.length > 80 && (
            <ShowMoreBtn ref={showMoreBtn} onClick={onClickShowMore}>
              ...더보기
            </ShowMoreBtn>
          )}
        </Description>
      </BottomColumn>
      {/* 설명란 및 더보기 버튼 */}
      <MapColumn>
        <Map product={product} />
      </MapColumn>
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
    </Container>
  )
}

export default DetailMobileInfo
