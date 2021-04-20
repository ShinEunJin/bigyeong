import React, { useState } from 'react'
import styled from "styled-components"
import AvatarUpload from '../../Components/utils/AvatarUpload'
import { useSelector } from "react-redux"

const Container = styled.div`
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

    const { userData: user } = useSelector(state => state.user)

    const [image, setImage] = useState("")

    const updateImage = newImage => {
        setImage(newImage)
    }

    return (
        <Container>
            <ProfleColumn>
                <Profile>
                    <AvatarUpload refreshFunction={updateImage} />
                    <NameColumn>
                        {user.name}
                    </NameColumn>
                    <EmailColumn>
                        {user.email}
                    </EmailColumn>
                    <Button>
                        <Span>프로필 수정 완료</Span>
                    </Button>
                </Profile>
            </ProfleColumn>
        </Container>
    )
}

export default UpdateProfile
