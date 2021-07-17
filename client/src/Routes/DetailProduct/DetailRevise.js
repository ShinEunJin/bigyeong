import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import axios from "axios"
import { withRouter } from "react-router"
import { FaPen, FaTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import theme from "../../hoc/theme"

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
  width: 10rem;
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
  const { product } = useSelector((state) => state.product)
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
    <ButtonColumn theme={theme}>
      <Link to={`/product/${product._id}/update`}>
        <Button style={{ marginRight: "1rem", backgroundColor: "#80bfff" }}>
          <FaPen
            style={{
              marginRight: "0.2rem",
            }}
          />
          <Span>수정하기</Span>
        </Button>
      </Link>
      <Button onClick={onClickDelete} style={{ backgroundColor: "#ff8080" }}>
        <FaTrashAlt
          style={{
            marginRight: "0.2rem",
          }}
        />
        <Span>삭제하기</Span>
      </Button>
    </ButtonColumn>
  )
}

export default withRouter(DetailDelete)
