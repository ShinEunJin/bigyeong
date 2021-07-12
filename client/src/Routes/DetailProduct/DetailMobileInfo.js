import React, { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { AiFillEye } from "react-icons/ai"
import Report from "../../Components/utils/Report"
import Map from "../../Components/utils/Map/DetailMap"

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
  const { product } = useSelector((state) => state.product)

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
      <MapColumn>
        <Map product={product} />
      </MapColumn>
    </Container>
  )
}

export default DetailMobileInfo
