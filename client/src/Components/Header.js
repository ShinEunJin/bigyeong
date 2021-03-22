import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from "styled-components"

const Header = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    height: 3rem;
    background-color: rgba(10, 10, 10, 0.6);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
    box-shadow: 2px 2px 5px black;
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

export default withRouter(props => (
    <Header>
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
    </Header>
))
