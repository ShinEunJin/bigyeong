import React from "react"
import { Avatar as NoAvatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"
import styled from "styled-components"
import dotenv from "dotenv"
dotenv.config()

const RealAvatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin-right: 20px;
`

function Avatar() {
  const { userData: user } = useSelector((state) => state.user)

  return (
    <>
      {user && user.avatar ? (
        <RealAvatar src={process.env.REACT_APP_DEV_PORT + `/${user.avatar}`} />
      ) : (
        <NoAvatar
          style={{ marginRight: 20 }}
          size={40}
          icon={<UserOutlined />}
        />
      )}
    </>
  )
}

export default Avatar
