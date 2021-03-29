import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import styled from "styled-components"
import { logout } from "../_actions/user_action"

const HeaderBar = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
    box-shadow: 2px 2px 5px black;
    z-index: 5;
    background-color: white;
`

const SLink = styled(Link)`
    font-size: 16px;
`

const OnPage = styled.div`
    border-bottom: 2px solid ${props => props.current ? "aqua" : "transparent"};
    margin: 0px 10px;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    transition: border-bottom 0.1s linear;
`

function Header(props) {

    const user = useSelector(state => state.user)

    const dispatch = useDispatch()

    const onLogoutHandler = () => {
        dispatch(logout())
            .then(res => {
                if (res.payload.success) {
                    props.history.push(`${props.location.pathname}`)
                } else {
                    alert("로그아웃 실패했습니다.")
                }
            })
    }

    if (user.userData && !user.userData.isAuth) {
        return (
            <HeaderBar>
                <div>
                    <OnPage current={props.location.pathname === "/"}>
                        <SLink to="/">Home</SLink>
                    </OnPage>
                </div>
                <div style={{ display: "flex" }}>
                    <OnPage current={props.location.pathname === "/login"}>
                        <SLink to="/login">로그인</SLink>
                    </OnPage>
                    <OnPage current={props.location.pathname === "/register"}>
                        <SLink to="/register">회원가입</SLink>
                    </OnPage>
                </div>
            </HeaderBar>
        )
    } else {
        return (
            <HeaderBar>
                <div>
                    <OnPage current={props.location.pathname === "/"}>
                        <SLink to="/">Home</SLink>
                    </OnPage>
                </div>
                <div style={{ display: "flex" }}>
                    <OnPage current={props.location.pathname === "/upload"}>
                        <SLink to="/upload">업로드</SLink>
                    </OnPage>
                    <OnPage>
                        <div style={{ fontSize: "16px", cursor: "pointer" }} onClick={onLogoutHandler}>로그아웃</div>
                    </OnPage>
                </div>
            </HeaderBar >
        )
    }
}

export default withRouter(Header)
