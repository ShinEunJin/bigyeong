import React from "react"
import { Avatar as NoAvatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"
import styled from "styled-components"
import dotenv from "dotenv"

dotenv.config()

const RealAvatar = styled.img`
  height: 3rem;
  width: 3rem;
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
        <RealAvatar
          src={
            process.env.NODE_ENV === "development"
              ? `http://localhost:5000/${user.avatar}`
              : user.avatar
          }
        />
      ) : (
        <NoAvatar
          style={{ marginRight: 20 }}
          size={48}
          icon={<UserOutlined />}
        />
      )}
    </>
  )
}

export default Avatar
