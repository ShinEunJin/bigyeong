import axios from "axios"
import React, { useState } from "react"
import styled from "styled-components"
import RegisterAuth from "./RegisterAuth"

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  border: none;
  font-size: 25px;
  color: white;
  background-color: rgba(20, 20, 20, 1);
  outline: none;
  border-bottom: 1px solid rgba(200, 200, 200, 0.7);
  margin: 10px 0px 30px 0px;
`

const Label = styled.label`
  font-size: 17px;
`

const Button = styled.button`
  box-shadow: 2px 2px 4px rgba(50, 50, 50, 0.8);
  border: none;
  border-radius: 10px;
  background-color: rgba(10, 10, 10, 0.9);
  font-size: 20px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  height: 50px;
  outline: none;
`

function Login() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [registerInfo, setRegisterInfo] = useState({})
  const [authStage, setAuthStage] = useState(false)

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onChangeName = (e) => {
    setName(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!email) return alert("이메일을 적어주시기 바랍니다.")
    else if (!name) return alert("이름(닉네임)을 적어주시기 바랍니다.")
    else if (!password) return alert("비밀번호를 적어주시기 바랍니다.")
    else if (!confirmPassword)
      return alert("비밀번호 확인칸을 채워주시기 바랍니다.")
    if (password === confirmPassword) {
      let body = { email }
      const { data } = await axios.post("/api/users/registerCheck", body)
      if (data.isExisted) {
        alert("이미 회원 가입된 이메일 입니다.")
      } else {
        setAuthStage(true)
        setRegisterInfo({ email, name, password })
      }
    } else {
      alert("비밀번호를 다시 확인해 주십시오.")
    }
  }

  return (
    <Container>
      {authStage ? (
        <RegisterAuth registerInfo={registerInfo} />
      ) : (
        <Form onSubmit={onSubmitHandler}>
          <Label>이메일</Label>
          <Input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={onChangeEmail}
          />
          <Label>이름</Label>
          <Input
            type="text"
            required
            placeholder="Name"
            value={name}
            onChange={onChangeName}
          />
          <Label>비밀번호</Label>
          <Input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
          />
          <Label>비밀번호 확인</Label>
          <Input
            type="password"
            required
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
          />
          <Button type="submit">회원 가입</Button>
        </Form>
      )}
    </Container>
  )
}

export default Login
