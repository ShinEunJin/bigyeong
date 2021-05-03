import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import styled from "styled-components"
import { Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { logout } from "../_actions/user_action"
import dotenv from "dotenv"
dotenv.config()

const HeaderBar = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10%;
  box-shadow: 2px 2px 5px #b3e6ff;
  z-index: 5;
  background-color: #ebfaff;
  font-weight: 600;
`

const SLink = styled(Link)`
  font-size: 16px;
`

const OnPage = styled.div`
  border-bottom: 2px solid
    ${(props) => (props.current ? "#8597ff" : "transparent")};
  margin: 0px 10px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  transition: border-bottom 0.1s linear;
`

const RealAvatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
`

function Header(props) {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const onLogoutHandler = () => {
    dispatch(logout()).then((res) => {
      if (res.payload.success) {
        props.history.push("/login")
      } else {
        alert("로그아웃 실패했습니다.")
      }
    })
  }

  if (user.userData && !user.userData.isAuth) {
    return (
      <HeaderBar>
        <div>
          <OnPage>
            <SLink to="/">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  style={{ height: 50, width: 50 }}
                  src={process.env.REACT_APP_DEV_PORT + "/logo/logo1.png"}
                />
                <span style={{ paddingLeft: 3, fontSize: "1.5em" }}>
                  EunJinTour
                </span>
              </div>
            </SLink>
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
          <OnPage>
            <SLink to="/">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  style={{ height: 50, width: 50 }}
                  src={process.env.REACT_APP_DEV_PORT + "/logo/logo1.png"}
                />
                <span style={{ paddingLeft: 3, fontSize: "1.5em" }}>
                  EunJinTour
                </span>
              </div>
            </SLink>
          </OnPage>
        </div>
        <div style={{ display: "flex" }}>
          <OnPage current={props.location.pathname === "/user/cart"}>
            <SLink to="/user/cart">찜목록</SLink>
          </OnPage>
          <OnPage current={props.location.pathname === "/upload"}>
            <SLink to="/upload">업로드</SLink>
          </OnPage>
          <OnPage current={props.location.pathname === "/user/my-profile"}>
            <SLink to="/user/my-profile">
              {user && user.userData.avatar ? (
                <RealAvatar src={user.userData.avatar} />
              ) : (
                <Avatar size={40} icon={<UserOutlined />} />
              )}
            </SLink>
          </OnPage>
          <OnPage>
            <div
              style={{ fontSize: "16px", cursor: "pointer" }}
              onClick={onLogoutHandler}
            >
              로그아웃
            </div>
          </OnPage>
        </div>
      </HeaderBar>
    )
  }
}

export default withRouter(Header)
