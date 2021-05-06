import React, { useState } from "react"
import styled from "styled-components"
import { FaEnvelopeOpenText } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { registerUser } from "../../_actions/user_action"
import { withRouter } from "react-router-dom"
import axios from "axios"

const Container = styled.div`
  display: flex
  flex-direction: column;
`

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Span = styled.span`
  display: block;
  margin-bottom: 2rem;
`

const Form = styled.form`
  padding-top: 2rem;
`

const InputAuth = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  width: 100%;
  background-color: #ebfaff;
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 3rem;
  font-weight: 600;
  padding-left: 5px;
  &::placeholder {
    opacity: 0.5;
    text-align: center;
  }
  font-size: 1.2em;
`

const InputSubmit = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 4px rgba(50, 50, 50, 0.8);
  border: none;
  border-radius: 10px;
  background-color: rgba(10, 10, 10, 0.9);
  font-size: 1.2em;
  color: white;
  font-weight: 600;
  cursor: pointer;
  height: 2em;
  outline: none;
  width: 100%;
`

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 4px rgba(50, 50, 50, 0.8);
  border: none;
  border-radius: 10px;
  background-color: rgba(10, 10, 10, 0.9);
  font-size: 1.2em;
  color: white;
  font-weight: 600;
  cursor: pointer;
  height: 2em;
  outline: none;
  width: 100%;
`

function RegisterAuth(props) {
  const dispatch = useDispatch()

  const [sendEmail, setSendEmail] = useState(false)
  const [randomNum, setRandomNum] = useState("")
  const [authNum, setAuthNum] = useState("")

  const onEmailSend = () => {
    const {
      registerInfo: { email },
    } = props
    setSendEmail(true)
    const randomNum = Math.floor(Math.random() * 1000000)
    setRandomNum(randomNum)
    let body = { email, randomNum }
    try {
      axios.post("/api/users/registerAuth", body)
    } catch (error) {
      alert("인증 메일을 보내는데 실패하였습니다.")
    }
  }

  const onAuthNumber = (e) => {
    setAuthNum(e.target.value)
  }

  const onSubmitHandler = async (e) => {
    await e.preventDefault()
    const {
      registerInfo: { email, name, password },
    } = props
    if (parseInt(randomNum, 10) === parseInt(authNum, 10)) {
      let body = { email, name, password }
      try {
        const { payload } = await dispatch(registerUser(body))
        console.log("payload", payload)
        if (payload.isExisted) {
          alert("이미 회원 가입된 이메일 입니다.")
          props.history.push("/login")
        } else {
          alert("성공적으로 회원 가입을 했습니다.")
          props.history.push("/login")
        }
      } catch (error) {
        alert("특정 오류로 인해 회원가입 하는데 실패하였습니다.")
      }
    } else {
      alert("인증번호가 맞지 않습니다.")
    }
  }

  return (
    <Container>
      {sendEmail ? (
        <>
          <TextColumn>
            <Span>
              해당{" "}
              <span style={{ fontWeight: 600, fontSize: "1.1em" }}>
                이메일
                <FaEnvelopeOpenText />
              </span>
              로 인증번호가 발송되었습니다.
            </Span>
            <Span>
              이메일을 확인 후{" "}
              <span style={{ fontWeight: 600, fontSize: "1.1em" }}>
                인증번호
              </span>
              를 입력해 주십시오.
            </Span>
          </TextColumn>
          <Form onSubmit={onSubmitHandler}>
            <InputAuth
              type="number"
              placeholder="인증번호 입력"
              value={authNum}
              onChange={onAuthNumber}
            />
            <InputSubmit type="submit" value="확인" />
          </Form>
        </>
      ) : (
        <TextColumn>
          <Span>
            회원 가입을 위해서는{" "}
            <span style={{ fontWeight: 600, fontSize: "1.1em" }}>
              이메일 인증
              <FaEnvelopeOpenText />
            </span>
            이 필요합니다.
          </Span>
          <Span>인증 번호를 받기 위해 밑에 버튼을 눌러 주십시오.</Span>
          <Button onClick={onEmailSend}>
            인증 번호 받기 <FaEnvelopeOpenText />
          </Button>
        </TextColumn>
      )}
    </Container>
  )
}

export default withRouter(RegisterAuth)
