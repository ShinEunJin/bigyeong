import React, { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { FiShoppingBag } from "react-icons/fi"
import { FaTrashAlt } from "react-icons/fa"
import { CgEnter } from "react-icons/cg"
import dotenv from "dotenv"
import { updateUserTake } from "../../_actions/user_action"
import { Link } from "react-router-dom"
import routes from "../../routes"

dotenv.config()

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
  background-color: gray;
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

function CartPage() {
  const dispatch = useDispatch()

  const { userData } = useSelector((state) => state.user)

  const [product, setProduct] = useState([])

  const getUserTake = async (productList) => {
    const { data } = await axios.get(
      `${routes.apiUserTake}?productId=${productList}`
    )
    setProduct(data.product)
  }

  useEffect(() => {
    if (userData.take && userData.take.length > 0) {
      getUserTake(userData.take)
    } else {
      setProduct([])
    }
  }, [userData])

  const onDeleteBtn = (productId) => {
    let body = {
      userId: userData._id,
      productId,
      add: false,
    }
    dispatch(updateUserTake(body))
  }

  return (
    <Container>
      <Title>
        <FiShoppingBag style={{ marginRight: 5 }} />
        찜목록
      </Title>
      {product && product.length > 0 ? (
        <Table>
          <thead>
            <Tr>
              <Th>이미지</Th>
              <Th>제목</Th>
              <Th>위치</Th>
              <Th>링크</Th>
              <Th>삭제</Th>
            </Tr>
          </thead>
          <tbody>
            {product.map((item, index) => (
              <Tr key={index}>
                <Td style={{ width: "15%", textAlign: "center" }}>
                  <img
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    src={
                      process.env.NODE_ENV === "development"
                        ? `http://localhost:5000/${item.images[0]}`
                        : item.images[0]
                    }
                  />
                </Td>
                <Td style={{ width: "25%" }}>{item.name}</Td>
                <Td style={{ width: "35%" }}>
                  {item.address} / {item.location}
                </Td>
                <Td style={{ width: "10%", textAlign: "center" }}>
                  <Link to={`${routes.apiProduct}?productId=${item._id}`}>
                    보러 가기
                    <CgEnter />
                  </Link>
                </Td>
                <Td style={{ width: "5%", textAlign: "center" }}>
                  <SFaTrashAlt onClick={() => onDeleteBtn(item._id)} />
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
