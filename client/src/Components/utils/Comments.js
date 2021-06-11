import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { FaTimes } from "react-icons/fa"
import { Input, Avatar as NoAvatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import axios from "axios"
import { Link, withRouter } from "react-router-dom"
import { useSelector } from "react-redux"
import Avatar from "./Avatar"
import dotenv from "dotenv"

dotenv.config()

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
  background-color: rgba(234, 235, 255, 0.6);
  border-radius: 15px;
  display: flex;
  margin-bottom: 2rem;
  justify-content: space-between;
`

const RealAvatar = styled.img`
  height: 3rem;
  width: 3rem;
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

const CommentName = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
  margin-right: 1rem;
`

const CommentDate = styled.div`
  font-size: 0.8em;
  opacity: 0.7;
`

const DeleteColumn = styled.div`
  min-width: 5%;
  max-width: 44px;
`

const LoadMoreBtn = styled.button`
  border: 1px solid rgba(200, 200, 200, 0.5);
  background-color: rgba(234, 235, 235, 0.8);
  color: rgba(100, 100, 100, 0.9);
  border-radius: 5px;
  padding: 0.3rem;
  font-size: 0.9em;
  cursor: pointer;
`

let skip = 0
let limit = 5
let changedSkip = 0
let loadMore = false

function Comments(props) {
  const { userData: user } = useSelector((state) => state.user)

  const productId = props.match.params.id

  const [text, setText] = useState("")
  const [comments, setComments] = useState([])
  const [commentNumber, setCommentNumber] = useState(0)
  const [commentLastNumber, setCommentLastNumer] = useState(0)

  const onTextChange = (e) => {
    setText(e.target.value)
  }

  const onSubmitHandler = async (e) => {
    await e.preventDefault()
    let body = { text, productId }
    if (user.isAuth) {
      try {
        await axios.post("/api/product/comments", body)
        await getComments(skip, limit)
        setText("")
      } catch (error) {
        alert("댓글을 등록하는데 실패하였습니다.")
      }
    } else {
      alert("댓글을 등록하기 위해서는 로그인을 해야합니다.")
    }
  }

  const getComments = async (skip, limit) => {
    try {
      const { data } = await axios.get(
        `/api/product/comments?productId=${productId}&skip=${skip}&limit=${limit}`
      )
      if (loadMore) {
        setComments([...comments, ...data.comments])
      } else {
        setComments(data.comments)
      }
      setCommentLastNumer(data.comments.length)
      setCommentNumber(data.length)
    } catch (error) {
      alert("댓글을 불러오는데 실패하였습니다.")
    }
  }

  const onDeleteComment = async (commentId) => {
    try {
      loadMore = false
      changedSkip = 0
      await axios.delete(
        `/api/product/comments?commentId=${commentId}&productId=${productId}&userId=${user._id}`
      )
      await getComments(skip, limit)
      alert("해당 댓글을 삭제하였습니다.")
    } catch (error) {
      alert("댓글을 지우는데 실패하였습니다.")
    }
  }

  const loadMoreHandler = () => {
    loadMore = true
    changedSkip = changedSkip + limit
    getComments(changedSkip, limit)
  }

  useEffect(() => {
    getComments(skip, limit)
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
              {item.writer && item.writer.avatar ? (
                <Link to={`/user/profile/${item.writer._id}`}>
                  <RealAvatar
                    src={
                      process.env.NODE_ENV === "development"
                        ? `http://localhost:5000/${item.writer.avatar}`
                        : item.writer.avatar
                    }
                  />
                </Link>
              ) : (
                <Link to={`/user/profile/${item.writer._id}`}>
                  <NoAvatar
                    style={{ marginRight: 20 }}
                    size={48}
                    icon={<UserOutlined />}
                  />
                </Link>
              )}
            </AvatarColumn>
            <TextColumn>
              <div style={{ display: "flex" }}>
                <CommentName>{item.writer && item.writer.name}</CommentName>
                <CommentDate>{item.date}</CommentDate>
              </div>
              <span>{item.text}</span>
            </TextColumn>
            <DeleteColumn>
              {user && item.writer && user._id === item.writer._id ? (
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
      {commentLastNumber === limit && (
        <LoadMoreBtn onClick={loadMoreHandler}>더보기</LoadMoreBtn>
      )}
    </CommentsColumn>
  )
}

export default withRouter(Comments)
