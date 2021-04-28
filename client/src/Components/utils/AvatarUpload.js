import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import Dropzone from "react-dropzone"
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { FaCamera } from "react-icons/fa"
import axios from 'axios'
import { useSelector } from 'react-redux'

const StyleDropZone = styled.div`
    height: 96px;
    width: 96px;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
`

const SFaCamera = styled(FaCamera)`
    position: absolute;
    bottom: 5px;
    right: 5px;
`

const RealAvatar = styled.img`
    height: 96px;
    width: 96px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
`

function AvatarUpload(props) {

    const { userData: user } = useSelector(state => state.user)

    const [avatar, setAvatar] = useState("")

    const onDropHandler = async (avatarFile) => {
        let formData = new FormData()
        const config = {
            header: { "content-type": "multipart/form-data" }
        }
        formData.append("avatarFile", avatarFile[0])
        const { data: { filePath } } = await axios.post("/api/users/uploadAvatar", formData, config)
        if (filePath) {
            setAvatar(filePath)
            props.refreshFunction(filePath)
        } else {
            alert("이미지를 저장하는데 실패했습니다.")
        }
    }

    useEffect(() => {
        if (user && user.avatar) {
            setAvatar(user.avatar)
            props.refreshFunction(user.avatar)
        } else {
            setAvatar("")
        }
    }, [])

    return (
        <div style={{ marginBottom: 70 }}>
            <Dropzone onDrop={onDropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <StyleDropZone {...getRootProps()}>
                            <input {...getInputProps()} />
                            {avatar ? <RealAvatar src={`http://localhost:5000/${avatar}`} /> : <Avatar size={96} icon={<UserOutlined />} />}
                            <SFaCamera />
                        </StyleDropZone>

                    </section>
                )}
            </Dropzone>
        </div>
    )
}

export default AvatarUpload
