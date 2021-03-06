import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { FaTimes } from "react-icons/fa"
import { Input } from "antd"
import axios from "axios"
import { withRouter } from "react-router-dom"
import theme from "../../hoc/theme"
import routes from "../../routes"
import Report from "../utils/Report"

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
  @media ${(props) => props.theme.tablet} {
    width: 80vw;
  }
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
  @media ${(props) => props.theme.tablet} {
    width: 60vw;
    margin-right: 0;
  }
`

const InputPassword = styled(Input.Password)`
  width: 10vw;
  margin-bottom: 0.5rem;
  color: black;
  @media ${(props) => props.theme.tablet} {
    width: 60vw;
  }
`

const InputText = styled(TextArea)`
  width: 70%;
  border: none;
  background-color: inherit;
  border-bottom: solid 1px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
  @media ${(props) => props.theme.tablet} {
    width: 80vw;
  }
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
  @media ${(props) => props.theme.tablet} {
    width: 80vw;
  }
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
  const [commentNumber, setCommentNumber] = useState(0) //?????? ??????
  const [commentLastNumber, setCommentLastNumer] = useState(0) //?????? ??????????????? ????????? ?????? ?????? ?????? ??????
  const [toggleDeleteBtn, setToggleDeleteBtn] = useState(-1) // ?????? ?????? ??? ??????
  const [deletePassword, setDeletePassword] = useState("")

  //?????? ??????
  const onTextChange = (e) => {
    setText(e.target.value)
  }

  //?????? ?????????
  const onNameChange = (e) => {
    setName(e.target.value)
  }

  //?????? ????????????
  const onPasswordChange = (e) => {
    setPassword(
      e.target.value.replace(
        /[^a-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,
        ""
      )
    )
  }

  //?????? ????????????
  const onDeletePasswordChange = (e) => {
    setDeletePassword(e.target.value.replace(/\s/gi, ""))
  }

  //?????? ??????
  const onSubmitHandler = async (e) => {
    await e.preventDefault()
    let body = { text, productId, name, password }
    try {
      if (text.trim() === "") return alert("????????? ?????????????????????.")
      else if (name.trim() === "")
        return alert("??????(?????????)??? ?????????????????????.")
      else if (password.trim() === "")
        return alert("??????????????? ?????????????????????.")
      await axios.post(routes.apiComment, body)
      //?????? ?????? ??? ?????? ????????? ????????? ?????? loadMore, changedSkip, skip ?????????
      loadMore = false
      changedSkip = 0
      skip = 0
      setText("")
      await getComments(skip)
    } catch (error) {
      console.log(error)
      alert("????????? ??????????????? ?????????????????????.")
    }
  }

  //?????? ????????????
  const getComments = async (skip) => {
    try {
      const { data } = await axios.get(
        `${routes.apiComment}?productId=${productId}&skip=${skip}&limit=${LIMIT}`
      )
      //????????? ?????? ?????? ??? ????????? ???????????? ?????? ?????? ????????? ?????????
      if (loadMore) {
        setComments([...comments, ...data.comments])
      } else {
        setComments(data.comments)
      }
      setCommentLastNumer(data.comments.length) //?????? ???????????? ????????? ??????
      setCommentNumber(data.length) // ?????? ??? ??????
    } catch (error) {
      alert("????????? ??????????????? ?????????????????????.")
    }
  }

  const onDeleteComment = async (e, commentId) => {
    e.preventDefault()
    try {
      //?????? ????????? ?????? ?????? ?????? ??? ?????? ????????? ???????????? ?????? ??? 3??? ?????? ?????????
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

  //?????? ?????? ?????? ??? ?????? ?????? ??????
  const onToggleDeleteBtn = (index) => {
    if (toggleDeleteBtn === index) setToggleDeleteBtn(-1)
    else setToggleDeleteBtn(index)
  }

  //?????? ????????????
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
      <CommetsHead>?????? ({commentNumber})</CommetsHead>
      {/* ?????? ?????? */}
      <FormColumn>
        <Form onSubmit={onSubmitHandler}>
          <InputName
            theme={theme}
            size="small"
            placeholder="??????(?????????)"
            maxLength={20}
            value={name}
            onChange={onNameChange}
          />
          <InputPassword
            theme={theme}
            size="small"
            placeholder="????????????"
            maxLength={20}
            value={password}
            onChange={onPasswordChange}
          />
          <InputText
            theme={theme}
            placeholder="?????? ????????????"
            showCount
            autoSize={{ minRows: 5 }}
            maxLength={500}
            value={text}
            onChange={onTextChange}
          />
          <InputSubmit type="submit" value="??????" />
        </Form>
      </FormColumn>
      {/* ?????? ?????? */}
      {comments &&
        comments.length > 0 &&
        comments.map((item, index) => (
          <CommentsList theme={theme} key={index}>
            <TextColumn theme={theme}>
              <div style={{ display: "flex" }}>
                <CommentName>{item.name}</CommentName>
                <CommentDate>{item.date}</CommentDate>
              </div>
              <span>{item.text}</span>
            </TextColumn>
            {/* ?????? ????????? */}
            <DeleteColumn>
              {toggleDeleteBtn === index ? (
                <form style={{ position: "absolute", right: "5%" }}>
                  {/* ????????? InputName?????? ??? */}
                  <InputName
                    type="password"
                    size="middle"
                    placeholder="????????????"
                    suffix={
                      <>
                        <Btn onClick={(e) => onDeleteComment(e, item._id)}>
                          ??????
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
                <>
                  <FaTimes
                    style={{ cursor: "pointer" }}
                    onClick={() => onToggleDeleteBtn(index)}
                  />
                  <Report report={{ category: "comment", id: item._id }} />
                </>
              )}
            </DeleteColumn>
          </CommentsList>
        ))}
      {/* ????????? ?????? */}
      {commentLastNumber === LIMIT && (
        <LoadMoreBtn theme={theme} onClick={loadMoreHandler}>
          ?????????
        </LoadMoreBtn>
      )}
    </CommentsColumn>
  )
}

export default withRouter(Comments)
