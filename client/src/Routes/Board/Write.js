import React, { useState } from "react"
import styled from "styled-components"
import { Input } from "antd"
import { FaTimes } from "react-icons/fa"
import axios from "axios"
import routes from "../../routes"
import theme from "../../hoc/theme"
import { useMediaQuery } from "react-responsive"

const Container = styled.div`
  width: 120%;
  height: 70vh;
  margin: 0 auto;
  background-color: #e8f0f2;
  border-radius: 1rem;
  display: flex;
  position: absolute;
  left: -10%;
  z-index: 10;
  @media ${(props) => props.theme.tablet} {
    width: 100%;
    margin: 0;
    position: unset;
    border-radius: unset;
    height: 100vh;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 80%;
  margin-bottom: 2px;
  @media ${(props) => props.theme.tablet} {
    flex-wrap: wrap;
  }
`

const Title = styled(Input.TextArea)`
  width: 75%;
  border-radius: 5px;
  margin-right: 2px;
  @media ${(props) => props.theme.tablet} {
    width: 100%;
  }
`

const Password = styled(Input.Password)`
  width: 20%;
  border-radius: 5px;
  margin-right: 2px;
  @media ${(props) => props.theme.tablet} {
    width: 80%;
  }
`

const Text = styled(Input.TextArea)`
  width: 80%;
  margin: 0 auto;
`

const Submit = styled.input`
  border: 1px solid #8c8078;
  border-radius: 5px;
  font-size: 0.9em;
  width: 5%;
  height: 2rem;
  cursor: pointer;
  color: black;
  font-weight: 600;
  @media ${(props) => props.theme.tablet} {
    width: 19%;
    font-size: 0.8em;
  }
`

function Write({ takeReveal, refreshBoard }) {
  const [title, setTitle] = useState("")
  const [password, setPassword] = useState("")
  const [text, setText] = useState("")

  const onClickX = () => {
    takeReveal(false) //x 버튼 눌러서 글쓰기 창 닫기 - 부모 컴포넌트에 reveal 상태 주기
  }

  const onTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(
      e.target.value.replace(
        /[^a-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,
        ""
      )
    )
  }

  const onTextChange = (e) => {
    setText(e.target.value)
  }

  const onSubmitHandler = async (e) => {
    await e.preventDefault()
    if (title.trim() === "") return alert("제목을 적어주시기 바랍니다.")
    else if (!password) return alert("비밀번호를 적어주시기 바랍니다.")
    else if (text.trim() === "") return alert("내용을 적어주시기 바랍니다.")
    let body = { title, password, text }
    try {
      const { data } = await axios.post(routes.apiPost, body)
      if (data.success) {
        refreshBoard() // 글 작성한다음 게시판 새로고침
        takeReveal(false)
        alert("게시글 작성을 완료하였습니다.")
      } else {
        alert("게시글을 작성하는데 실패하였습니다.")
      }
    } catch (error) {
      console.log(error)
      alert("게시글을 작성하는데 실패하였습니다.")
    }
  }

  const isTabletOrLaptop = useMediaQuery({ query: theme.tablet })

  return (
    <Container theme={theme}>
      <Form onSubmit={onSubmitHandler}>
        <Header theme={theme}>
          <Title
            theme={theme}
            type="text"
            placeholder="제목"
            maxLength={80}
            autoSize={{ maxRows: 1 }}
            value={title}
            onChange={onTitleChange}
          />
          <Password
            theme={theme}
            placeholder="비밀번호"
            maxLength={20}
            value={password}
            onChange={onPasswordChange}
          />
          <Submit theme={theme} type="submit" value="확인" />
        </Header>
        <Text
          placeholder="내용을 자유롭게 써주시기 바랍니다."
          autoSize={{ minRows: 25 }}
          maxLength={3000}
          value={text}
          onChange={onTextChange}
        />
      </Form>
      {!isTabletOrLaptop && (
        <FaTimes
          onClick={onClickX}
          style={{
            color: "black",
            cursor: "pointer",
            fontSize: "1.5em",
            position: "absolute",
            top: "2rem",
            right: "2rem",
          }}
        />
      )}
    </Container>
  )
}

export default Write
