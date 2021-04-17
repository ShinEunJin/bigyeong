import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { uploadAvatar } from '../../_actions/user_action'

const Container = styled.div`
    width: 70%;
    margin: 0 auto;
`

const ProfleColumn = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const Profile = styled.div`
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

const PhotoColumn = styled.div``

const DescriptionColumn = styled.div`
    display: flex;
    flex-direction: column;
`

function MyProfile(props) {

    const [user, setUser] = useState({})
    const [name, setName] = useState("")

    const dispatch = useDispatch()

    const onNameChange = e => {
        setName(e.target.value)
    }

    const onUploadHandler = async () => {
        const result = await dispatch(uploadAvatar(imageFile))
        console.log("result", result)
    }

    useEffect(() => {
        if (props.user && props.user.userData) {
            setUser(props.user.userData)
        }
    }, [props.user, props.user.userData])

    return (
        <Container>
            <ProfleColumn>
                <Profile>
                    <form>
                        <input type="file" accept="image/*" />
                        <input type="text" value={name} onChange={onNameChange} />
                    </form>
                    {/* <Avatar onClick={onUploadHandler} size={64} draggable icon={<UserOutlined />} style={{ cursor: 'pointer' }} /> */}
                </Profile>
            </ProfleColumn>
        </Container>
    )
}

export default MyProfile
