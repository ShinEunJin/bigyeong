import React, { useState, useEffect } from "react"
import styled from "styled-components"
import AvatarUpload from "../../Components/utils/AvatarUpload"
import { useDispatch, useSelector } from "react-redux"
import { withRouter } from "react-router-dom"
import { updateProfile } from "../../_actions/user_action"

const Container = styled.div`
  padding-top: 100px;
  width: 70%;
  margin: 0 auto;
`

const ProfleColumn = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`

const Profile = styled.div`
  position: relative;
  width: 40%;
  max-width: 400px;
  height: 400px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

const NameColumn = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 20px;
`

const EmailColumn = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
`

const Button = styled.button`
  position: absolute;
  bottom: 20px;
  width: 90%;
  height: 50px;
  background-color: #98ddca;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-weight: 600;
`

const Span = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

function UpdateProfile(props) {
  const dispatch = useDispatch()

  const { userData: user } = useSelector((state) => state.user)

  const [avatar, setAvatar] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    setName(user.name)
    setEmail(user.email)
  }, [])

  const updateAvatar = (newAvatar) => {
    setAvatar(newAvatar)
  }

  const onClickHandler = async () => {
    if (email.indexOf("@") === -1) {
      alert("이메일을 다시 확인하여 주십시오.")
    } else if (name.trim() === "") {
      alert("이름 칸을 채워주시기 바랍니다.")
    } else {
      let body = { avatar, name, email }
      const {
        payload: { success },
      } = await dispatch(updateProfile(body))
      if (success) {
        props.history.push("/user/my-profile")
        setTimeout(() => {
          alert("성공적으로 프로필을 수정하였습니다.")
        }, 1000)
      } else {
        alert("프로필을 수정하는데 오류가 났습니다.")
      }
    }
  }

  const onChangeName = (e) => {
    setName(e.target.value)
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  return (
    <Container>
      <ProfleColumn>
        <Profile>
          <AvatarUpload refreshFunction={updateAvatar} />
          <NameColumn>
            <input
              type="text"
              placeholder="이름"
              defaultValue={user.name}
              onChange={onChangeName}
              maxLength={20}
            />
          </NameColumn>
          <EmailColumn>
            <input
              type="email"
              placeholder="이메일"
              defaultValue={user.email}
              onChange={onChangeEmail}
              maxLength={40}
            />
          </EmailColumn>
          <Button onClick={onClickHandler}>
            <Span>프로필 수정 완료</Span>
          </Button>
        </Profile>
      </ProfleColumn>
    </Container>
  )
}

export default withRouter(UpdateProfile)
