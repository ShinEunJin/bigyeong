import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import axios from "axios"
import { withRouter } from "react-router"

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

function DetailDelete(props) {
  const {
    data: { product },
  } = useSelector((state) => state.product)
  const { userData } = useSelector((state) => state.user)

  const onClickDelete = async () => {
    const { data } = await axios.delete(
      `/api/product?productId=${product._id}&userId=${userData._id}`
    )
    if (data.success) {
      props.history.push("/")
      setTimeout(() => {
        alert("컨텐츠를 성공적으로 삭제하였습니다.")
      }, 500)
    } else {
      alert("컨텐츠를 삭제하는데 실패 하였습니다.")
    }
  }

  return (
    <ButtonColumn>
      <Button
        /* onClick={onClickRevise} */
        style={{ marginRight: "1rem", backgroundColor: "#80bfff" }}
      >
        <Span>수정하기</Span>
      </Button>
      <Button onClick={onClickDelete} style={{ backgroundColor: "#ff8080" }}>
        <Span>삭제하기</Span>
      </Button>
    </ButtonColumn>
  )
}

export default withRouter(DetailDelete)
