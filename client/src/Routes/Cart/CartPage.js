import React, { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { useDispatch } from "react-redux"
import { removeTake } from "../../_actions/user_action"
import { FiShoppingBag } from "react-icons/fi"
import { FaTrashAlt } from "react-icons/fa"

const Container = styled.div`
  padding-top: 100px;
  width: 80%;
  margin: 0 auto;
  height: 80vh;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 2.2em;
  font-weight: bold;
`

const Table = styled.table`
  width: 100%;
  border: 1px solid #dddddd;
  border-collapse: collapse;
`

const Tr = styled.tr`
  border: 1px solid #dddddd;
`

const Th = styled.th`
  border: 1px solid #dddddd;
  background-color: #adf2ff;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
  font-size: 1.2em;
`

const Td = styled.td`
  border: 1px solid #dddddd;
  font-size: 1.1em;
  padding: 10px;
  text-align: left;
  vertical-align: middle;
  font-weight: 600;
`

const SFaTrashAlt = styled(FaTrashAlt)`
  font-size: 2em;
  cursor: pointer;
`

const EmptyDiv = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.5em;
`

function CartPage(props) {
  const dispatch = useDispatch()

  const [productState, setProductState] = useState([])

  let takeList = []

  useEffect(() => {
    if (props.user.userData && props.user.userData.take) {
      if (props.user.userData.take.length > 0) {
        props.user.userData.take.forEach((item) => {
          takeList.push(item.id)
        })
        try {
          const getTakeList = async () => {
            const {
              data: { product },
            } = await axios.get(`/api/product/take?id=${takeList}`)
            setProductState(product)
          }
          getTakeList()
        } catch (error) {
          console.log(error)
        }
      }
    }
  }, [props.user.userData])

  const handleRemoveTake = async (productId) => {
    const {
      payload: { product },
    } = await dispatch(removeTake(productId))
    setProductState(product)
  }

  return (
    <Container>
      <Title>
        <FiShoppingBag style={{ marginRight: 5 }} />
        찜목록
      </Title>
      {productState && productState.length > 0 ? (
        <Table>
          <thead>
            <Tr>
              <Th>이미지</Th>
              <Th>상품</Th>
              <Th>가격</Th>
              <Th>판매자</Th>
              <Th>삭제</Th>
            </Tr>
          </thead>
          <tbody>
            {productState.map((item, index) => (
              <Tr key={index}>
                <Td style={{ width: "15%", textAlign: "center" }}>
                  <img
                    style={{ width: 100, height: 100 }}
                    src={item.images[0]}
                  />
                </Td>
                <Td style={{ width: "30%" }}>{item.name}</Td>
                <Td style={{ width: "30%" }}>{item.location}</Td>
                <Td style={{ width: "20%" }}>{item.writer.name}</Td>
                <Td style={{ width: "5%", textAlign: "center" }}>
                  <SFaTrashAlt onClick={() => handleRemoveTake(item._id)} />
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <EmptyDiv>찜한 상품이 없습니다.</EmptyDiv>
      )}
    </Container>
  )
}

export default CartPage
