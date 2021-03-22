import React, { useState } from 'react'

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
        <>
            <input type="email" placeholder="이메일" value={email} onChange={onChangeEmail} />
            <input type="password" placeholder="비밀번호" value={password} onChange={onChangePassword} />
        </>
    )
}

export default Login
