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
      const { data } = await axios.delete(
        `/api/product/remove?id=${props.product._id}`
      )
      console.log(data)
      if (data.success) {
        alert("상품을 지우는데 성공하였습니다.")
        props.history.push("/")
      } else {
        alert("상품을 지우는데 실패하였습니다.")
      }
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
