import React, { useState } from 'react'
import styled from "styled-components"

const Div = styled.div`
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
    const [password, setPassword] = useState("")

    const onChangeEmail = e => {
        setEmail(e.target.value)
    }

    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    return (
        <Div>
            <Form>
                <Label>이메일</Label>
                <Input type="email" placeholder="Email" value={email} onChange={onChangeEmail} />
                <Label>비밀번호</Label>
                <Input type="password" placeholder="Password" value={password} onChange={onChangePassword} />
                <Button type="submit">로그인</Button>
            </Form>
        </Div>
    )
}

export default Login
