import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { FaTimes } from "react-icons/fa"
import { Input, Avatar as NoAvatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import axios from "axios"
import { withRouter } from "react-router-dom"
import { useSelector } from "react-redux"
import Avatar from "./Avatar"

const { TextArea } = Input

const CommentsColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`

const FormColumn = styled.div`
  display: flex;
  margin-bottom: 2rem;
  width: 100%;
`

const CommetsHead = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid black;
  font-weight: 600;
  font-size: 1.5em;
  margin-bottom: 20px;
`

const CommentsList = styled.div`
  padding: 1rem;
  background-color: #cff4ff;
  border-radius: 15px;
  display: flex;
  margin-bottom: 2rem;
  justify-content: space-between;
`

const RealAvatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
`

const Form = styled.form`
  align-self: flex-end;
  width: 90%;
`

const InputText = styled(TextArea)`
  width: 70%;
  border: none;
  background-color: inherit;
  border-bottom: solid 1px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
`

const InputSubmit = styled.input`
  background-color: inherit;
  border: 1px solid rgba(0, 0, 0, 0.7);
  cursor: pointer;
`

const AvatarColumn = styled.div`
  min-width: 10%;
  max-width: 88px;
`

const TextColumn = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  align-self: flex-start;
`

const CommentName = styled.span`
  font-weight: 600;
  margin-bottom: 10px;
`

const DeleteColumn = styled.div`
  min-width: 5%;
  max-width: 44px;
`

function Comments(props) {
  const { userData: user } = useSelector((state) => state.user)

  const productId = props.match.params.id

  const [text, setText] = useState("")
  const [comments, setComments] = useState([])
  const [commentNumber, setCommentNumber] = useState(0)

  const onTextChange = (e) => {
    setText(e.target.value)
  }

  const onSubmitHandler = async (e) => {
    await e.preventDefault()
    let body = { text, productId }
    if (user.isAuth) {
      try {
        await axios.post("/api/product/comments", body)
        await getComments()
        setText("")
      } catch (error) {
        alert("댓글을 등록하는데 실패하였습니다.")
      }
    } else {
      alert("댓글을 등록하기 위해서는 로그인을 해야합니다.")
    }
  }

  const getComments = async () => {
    try {
      const { data } = await axios.get(
        `/api/product/getComments?id=${productId}`
      )
      setComments(data.comments.reverse())
      setCommentNumber(data.comments.length)
    } catch (error) {
      alert("댓글을 불러오는데 실패하였습니다.")
    }
  }

  const onDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `/api/product/removeComment?commentId=${commentId}&productId=${productId}&userId=${user._id}`
      )
      await getComments()
      alert("해당 댓글을 삭제하였습니다.")
    } catch (error) {
      alert("댓글을 지우는데 실패하였습니다.")
    }
  }

  useEffect(() => {
    getComments()
  }, [])

  return (
    <CommentsColumn>
      <CommetsHead>댓글 ({commentNumber})</CommetsHead>
      <FormColumn>
        <Avatar />
        <Form onSubmit={onSubmitHandler}>
          <InputText
            placeholder="댓글 작성하기"
            showCount
            maxLength={500}
            value={text}
            onChange={onTextChange}
          />
          <InputSubmit type="submit" value="확인" />
        </Form>
      </FormColumn>
      {comments &&
        comments.length > 0 &&
        comments.map((item, index) => (
          <CommentsList key={index}>
            <AvatarColumn>
              {item.writer_avatar ? (
                <RealAvatar src={item.writer_avatar} />
              ) : (
                <NoAvatar
                  style={{ marginRight: 20 }}
                  size={40}
                  icon={<UserOutlined />}
                />
              )}
            </AvatarColumn>
            <TextColumn>
              <CommentName>{item.writer_name}</CommentName>
              <span>{item.text}</span>
            </TextColumn>
            <DeleteColumn>
              {user && user._id === item.writer ? (
                <FaTimes
                  style={{ cursor: "pointer" }}
                  onClick={() => onDeleteComment(item._id)}
                />
              ) : (
                <div></div>
              )}
            </DeleteColumn>
          </CommentsList>
        ))}
    </CommentsColumn>
  )
}

export default withRouter(Comments)
