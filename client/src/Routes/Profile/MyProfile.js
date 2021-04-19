import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useSelector } from "react-redux"


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

function MyProfile(props) {

    const { userData: user } = useSelector(state => state.user)

    /* const [user, setUser] = useState({})

    useEffect(() => {
        if (props.user && props.user.userData) {
            setUser(props.user.userData)
        }
    }, [props.user, props.user.userData]) */

    return (
        <Container>
            <ProfleColumn>
                <Profile>
                    <Avatar size={64} draggable icon={<UserOutlined />} />
                    {user.name}
                    {user.email}
                </Profile>
            </ProfleColumn>
        </Container>
    )
}

export default MyProfile
