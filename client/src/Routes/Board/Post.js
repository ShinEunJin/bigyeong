import React, { useEffect, useState } from "react"
import axios from "axios"
import routes from "../../routes"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import { FaTimes } from "react-icons/fa"
import { Input } from "antd"
import Report from "../../Components/utils/Report"

const Container = styled.div`
  width: 70%;
  padding-top: 5vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Tr = styled.tr`
  border: 1px solid #dddddd;
`

const Th = styled.th`
  background-color: gray;
  padding: 0.5em;
  text-align: center;
  vertical-align: middle;
  font-weight: 600;
  font-size: 1.1em;
  border: 1px solid #dddddd;
`

const Td = styled.td`
  padding: 10px;
  text-align: left;
  vertical-align: middle;
  border: 1px solid #dddddd;
`

const Title = styled.div`
  font-weight: 600;
`

const Date = styled.div``

const Text = styled.div`
  border: 1px solid #dddddd;
  border-top: none;
  padding: 1em;
  height: 80vh;
`

const Form = styled.form`
  position: absolute;
  right: 20%;
  width: 20vw;
`

const Submit = styled.input`
  outline: none;
  border: none;
  cursor: pointer;
  margin-right: 5px;
  font-weight: 600;
  background-color: #e8f0f2;
  color: black;
`

const Views = styled.div``

function Post(props) {
  const postId = props.match.params.id

  const [post, setPost] = useState({})
  const [display, setDisplay] = useState(false) // 삭제 토글 버튼에 사용
  const [password, setPassword] = useState("")
  const [report, setReport] = useState({
    id: postId,
    category: "post",
  })

  const getPost = async () => {
    const { data } = await axios.get(`${routes.apiPost}?postId=${postId}`)
    if (data.success) {
      setPost(data.post)
    } else {
      alert("게시글을 불러오는데 실패하였습니다.")
    }
  }

  const onToggleBtn = () => {
    if (display) return setDisplay(false)
    else return setDisplay(true)
  }

  const onDeletePost = async (e) => {
    e.preventDefault()
    if (password.trim() === "") return alert("비밀번호를 입력해 주십시오.")
    const { data } = await axios.delete(
      `${routes.apiPost}?postId=${postId}&password=${password}`
    )
    if (data.success) {
      props.history.push(routes.board)
      setTimeout(() => {
        alert(data.message)
      }, 700)
    } else {
      alert(data.message)
    }
  }

  const onPasswordChange = (e) => {
    setPassword(
      e.target.value.replace(
        /[^a-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,
        ""
      )
    )
  }

  useEffect(() => {
    getPost()
  }, [postId])

  return (
    <Container>
      <Table>
        <thead>
          <Tr>
            <Th>제목</Th>
            <Th>작성일</Th>
            <Th>조회수</Th>
            <Th>삭제</Th>
            <Th>신고</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>
              <Title>{post.title}</Title>
            </Td>
            <Td style={{ width: "14%", textAlign: "center" }}>
              <Date>{post.date}</Date>
            </Td>
            <Td style={{ width: "10%", textAlign: "center" }}>
              <Views>{post.views}</Views>
            </Td>
            <Td style={{ width: "8%", textAlign: "center" }}>
              {display ? (
                <Form onSubmit={onDeletePost}>
                  <Input
                    type="password"
                    placeholder="비밀번호"
                    maxLength={20}
                    value={password}
                    onChange={onPasswordChange}
                    suffix={
                      <>
                        <Submit type="submit" value="확인" />
                        <FaTimes
                          style={{ cursor: "pointer", color: "black" }}
                          onClick={onToggleBtn}
                        />
                      </>
                    }
                  />
                </Form>
              ) : (
                <FaTimes style={{ cursor: "pointer" }} onClick={onToggleBtn} />
              )}
            </Td>
            <Td style={{ width: "8%", textAlign: "center" }}>
              <Report report={report} />
            </Td>
          </Tr>
        </tbody>
      </Table>
      <Text>{post.text}</Text>
    </Container>
  )
}

export default withRouter(Post)
