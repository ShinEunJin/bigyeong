import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { FaTimes } from "react-icons/fa"
import { Input } from "antd"
import axios from "axios"
import { withRouter } from "react-router-dom"
import routes from "../../routes"

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

const Form = styled.form`
  align-self: flex-end;
  width: 90%;
`

const InputName = styled(Input)`
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  width: 10vw;
  color: black;
`

const InputPassword = styled(Input.Password)`
  width: 10vw;
  margin-bottom: 0.5rem;
  color: black;
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
  border-radius: 5px;
  padding: 0.5rem;
  border: 1px solid rgba(200, 200, 200, 0.5);
  cursor: pointer;
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
  text-shadow: 1px 1px 1px black;
`

const CommentDate = styled.div`
  font-size: 0.8em;
  opacity: 0.7;
`

const DeleteColumn = styled.div`
  position: relative;
  min-width: 5%;
  max-width: 44px;
`

const LoadMoreBtn = styled.button`
  border: 1px solid rgba(200, 200, 200, 0.5);
  background-color: rgba(180, 180, 180, 0.8);
  color: rgba(100, 100, 100, 0.9);
  width: 30%;
  border-radius: 5px;
  padding: 0.3rem;
  font-size: 0.9em;
  font-weight: 600;
  color: black;
  cursor: pointer;
  justify-self: center;
  margin: 0 auto;
`

const Btn = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  margin-right: 5px;
  font-weight: 600;
  background-color: #e8f0f2;
`

const LIMIT = 5
let skip = 0
let changedSkip = 0
let loadMore = false

function Comments(props) {
  const productId = props.match.params.id

  const [text, setText] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [comments, setComments] = useState([])
  const [commentNumber, setCommentNumber] = useState(0) //댓글 개수
  const [commentLastNumber, setCommentLastNumer] = useState(0) //댓글 더보기란을 컨트롤 하기 위해 만든 상태
  const [toggleDeleteBtn, setToggleDeleteBtn] = useState(-1) // 댓글 삭제 및 취소
  const [deletePassword, setDeletePassword] = useState("")

  //댓글 내용
  const onTextChange = (e) => {
    setText(e.target.value)
  }

  //댓글 닉네임
  const onNameChange = (e) => {
    setName(e.target.value.replace(/\s/gi, ""))
  }

  //댓글 비밀번호
  const onPasswordChange = (e) => {
    setPassword(
      e.target.value.replace(
        /[^a-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,
        ""
      )
    )
  }

  //삭제 비밀번호
  const onDeletePasswordChange = (e) => {
    setDeletePassword(e.target.value.replace(/\s/gi, ""))
  }

  //댓글 생성
  const onSubmitHandler = async (e) => {
    await e.preventDefault()
    let body = { text, productId, name, password }
    try {
      if (!text) return alert("댓글을 입력해주십시오.")
      else if (!name) return alert("이름(닉네임)을 입력해주십시오.")
      else if (!password) return alert("비밀번호를 입력해주십시오.")
      await axios.post(routes.apiComment, body)
      //댓글 생성 후 처음 상태로 돌리기 위해 loadMore, changedSkip, skip 초기화
      loadMore = false
      changedSkip = 0
      skip = 0
      setText("")
      await getComments(skip)
    } catch (error) {
      console.log(error)
      alert("댓글을 등록하는데 실패하였습니다.")
    }
  }

  //댓글 불러오기
  const getComments = async (skip) => {
    try {
      const { data } = await axios.get(
        `${routes.apiComment}?productId=${productId}&skip=${skip}&limit=${LIMIT}`
      )
      //더보기 버튼 누를 시 불러온 데이터와 원래 있는 데이터 합치기
      if (loadMore) {
        setComments([...comments, ...data.comments])
      } else {
        setComments(data.comments)
      }
      setCommentLastNumer(data.comments.length) //댓글 더보기란 컨트롤 기준
      setCommentNumber(data.length) // 댓글 총 개수
    } catch (error) {
      alert("댓글을 불러오는데 실패하였습니다.")
    }
  }

  const onDeleteComment = async (e, commentId) => {
    e.preventDefault()
    try {
      //댓글 생성과 같이 댓글 삭제 후 처음 상태로 되돌리기 위해 밑 3개 변수 초기화
      loadMore = false
      changedSkip = 0
      skip = 0
      const { data } = await axios.delete(
        `${routes.apiComment}?commentId=${commentId}&productId=${productId}&password=${deletePassword}`
      )
      if (data.success) {
        await getComments(skip)
        setToggleDeleteBtn(-1)
        alert(data.message)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //댓글 삭제 버튼 및 삭제 취소 버튼
  const onToggleDeleteBtn = (index) => {
    if (toggleDeleteBtn === index) setToggleDeleteBtn(-1)
    else setToggleDeleteBtn(index)
  }

  //댓글 더보기창
  const loadMoreHandler = () => {
    loadMore = true
    changedSkip = changedSkip + LIMIT
    getComments(changedSkip)
  }

  useEffect(() => {
    getComments(skip)
  }, [])

  return (
    <CommentsColumn>
      <CommetsHead>댓글 ({commentNumber})</CommetsHead>
      {/* 댓글 입력 */}
      <FormColumn>
        <Form onSubmit={onSubmitHandler}>
          <InputName
            size="small"
            placeholder="이름(닉네임)"
            maxLength={20}
            value={name}
            onChange={onNameChange}
          />
          <InputPassword
            size="small"
            placeholder="비밀번호"
            maxLength={20}
            value={password}
            onChange={onPasswordChange}
          />
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
      {/* 댓글 목록 */}
      {comments &&
        comments.length > 0 &&
        comments.map((item, index) => (
          <CommentsList key={index}>
            <TextColumn>
              <div style={{ display: "flex" }}>
                <CommentName>{item.name}</CommentName>
                <CommentDate>{item.date}</CommentDate>
              </div>
              <span>{item.text}</span>
            </TextColumn>
            {/* 댓글 지우기 */}
            <DeleteColumn>
              {toggleDeleteBtn === index ? (
                <form style={{ position: "absolute", right: "5%" }}>
                  <InputName
                    type="password"
                    size="middle"
                    placeholder="비밀번호"
                    suffix={
                      <>
                        <Btn onClick={(e) => onDeleteComment(e, item._id)}>
                          확인
                        </Btn>
                        <FaTimes
                          style={{ cursor: "pointer" }}
                          onClick={() => onToggleDeleteBtn(index)}
                        />
                      </>
                    }
                    maxLength={20}
                    value={deletePassword}
                    onChange={onDeletePasswordChange}
                  />
                </form>
              ) : (
                <FaTimes
                  style={{ cursor: "pointer" }}
                  onClick={() => onToggleDeleteBtn(index)}
                />
              )}
            </DeleteColumn>
          </CommentsList>
        ))}
      {/* 더보기 버튼 */}
      {commentLastNumber === LIMIT && (
        <LoadMoreBtn onClick={loadMoreHandler}>더보기</LoadMoreBtn>
      )}
    </CommentsColumn>
  )
}

export default withRouter(Comments)
