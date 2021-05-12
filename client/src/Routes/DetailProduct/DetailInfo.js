import React, { useEffect, useState } from "react"
import { Descriptions, Button } from "antd"
import styled from "styled-components"
import { HeartFilled, CaretUpOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { addTake, addLike } from "../../_actions/user_action"
import axios from "axios"
import DetailRevise from "./DetailRevise"

const ButtonColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 40px;
  margin-bottom: 50px;
`

function DetailInfo(props) {
  const [product, setProduct] = useState({})
  const [likeState, setLikeState] = useState(0)
  const [takeBool, setTakeBool] = useState(false)
  const [likeBool, setLikeBool] = useState(false)

  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    if (props.product) {
      setProduct(props.product)
      setLikeState(props.product.likes)
      if (user.userData && user.userData.likes) {
        if (user.userData.likes.length > 0) {
          user.userData.likes.forEach((item) => {
            if (item.id === props.product._id) {
              setLikeBool(true)
            }
          })
        }
      }
      if (user.userData && user.userData.take) {
        if (user.userData.take.length > 0) {
          user.userData.take.forEach((item) => {
            if (item.id === props.product._id) {
              setTakeBool(true)
            }
          })
        }
      }
    }
  }, [props.product])

  const handleTakeBtn = async () => {
    if (user.userData && user.userData.isAuth) {
      try {
        const { payload } = await dispatch(addTake(props.product._id))
        if (payload.isExisted) {
          setTakeBool(true)
          alert("해당 상품을 이미 찜 했습니다.")
        } else {
          setTakeBool(true)
          alert("해당 상품을 찜 했습니다.")
        }
      } catch (error) {
        console.log(error)
        alert("찜하기 에 실패하였습니다. 다시 시도하여 주십시오.")
      }
    } else {
      alert("로그인이 필요한 기능입니다.")
    }
  }

  const handleLikeBtn = async () => {
    if (user.userData && user.userData.isAuth) {
      try {
        let body = { productId: props.product._id, userId: user.userData._id }
        const { data } = await axios.post("/api/product/like", body)
        const { payload } = await dispatch(addLike(props.product._id))
        if (data.myProduct) {
          alert("자신의 상품에는 좋아요를 누를 수 없습니다.")
        } else {
          setLikeState(data.likes)
          if (payload.alreadyLike) {
            setLikeBool(false)
          } else {
            setLikeBool(true)
          }
        }
      } catch (error) {
        console.log(error)
        alert("좋아요 가 실패하였습니다. 다시 시도하여 주십시오.")
      }
    } else {
      alert("로그인이 필요한 기능입니다.")
    }
  }

  return (
    <div>info</div>
  )
}

export default DetailInfo
