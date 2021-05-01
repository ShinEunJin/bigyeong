import React from "react"
import styled from "styled-components"
import { Button } from "antd"
import axios from "axios"
import { withRouter } from "react-router"

const ButtonColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 40px;
  margin-bottom: 50px;
`

function DetailRevise(props) {
  const onRemoveBtn = async () => {
    try {
      await axios.delete(`/api/product/remove?id=${props.product._id}`)
      props.history.push("/")
      setTimeout(() => {
        alert("상품을 제거하는데 성공 했습니다.")
      }, 500)
    } catch (error) {
      alert("상품을 지우는데 실패하였습니다.")
    }
  }

  return (
    <ButtonColumn>
      <Button type="primary" size={"large"} block>
        수정하기
      </Button>
      <Button onClick={onRemoveBtn} type="primary" size={"large"} block danger>
        삭제하기
      </Button>
    </ButtonColumn>
  )
}

export default withRouter(DetailRevise)
