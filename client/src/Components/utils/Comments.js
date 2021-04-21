import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import axios from 'axios';
import { withRouter } from "react-router-dom"

const { TextArea } = Input;

const CommentsColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
`

const FormColumn = styled.div`
    display: flex;
    margin-bottom: 2rem;
    width: 100%;
`

const CommetsHead = styled.div`
    padding-bottom: 10px;
    border-bottom: 1px solid black;
    font-weight: 600;
    font-size: 1.5em;
    margin-bottom: 20px;
`

const CommentsList = styled.div`
    padding: 1rem;
    background-color: #fcecdd;
    border-radius: 15px;
    display: flex;
    margin-bottom: 2rem;
`

const Form = styled.form`
    align-self: flex-end;
    width: 90%;
`

const InputText = styled(TextArea)`
    width: 70%;
    border: none;
    background-color: inherit;
    border-bottom: solid 1px rgba(0, 0, 0, 0.3);
    margin-bottom: 1rem;
`

const InputSubmit = styled.input`
    background-color: inherit;
    border: 1px solid rgba(0, 0, 0, 0.7);
    cursor: pointer;
`

function Comments(props) {

    const productId = props.match.params.id

    const [text, setText] = useState("")
    const [comments, setComments] = useState([])

    const onTextChange = e => {
        setText(e.target.value)
    }

    const onSubmitHandler = async e => {
        e.preventDefault()
        let body = { text, productId }
        try {
            await axios.post("/api/product/comments", body)
        } catch (error) {
            alert("댓글을 등록하는데 실패하였습니다.")
        }
    }

    const getComments = async () => {
        try {
            const { data } = await axios.get(`/api/product/getComments?id=${productId}`)
            setComments(data.comments)
        } catch (error) {
            alert("댓글을 불러오는데 실패하였습니다.")
        }
    }

    useEffect(() => {
        getComments()
    }, [])

    return (
        <CommentsColumn>
            <CommetsHead>
                댓글
            </CommetsHead>
            <FormColumn>
                <Avatar style={{ marginRight: 20 }} size={40} icon={<UserOutlined />} />
                <Form onSubmit={onSubmitHandler}>
                    <InputText placeholder="댓글 작성하기" showCount maxLength={300} value={text} onChange={onTextChange} />
                    <InputSubmit type="submit" value="확인" />
                </Form>
            </FormColumn>
            {comments && comments.length > 0 && comments.map((item, index) => (
                <CommentsList key={index}>
                    <Avatar style={{ marginRight: 20, width: '10%' }} size={40} icon={<UserOutlined />} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: 600, marginBottom: 10 }}>{item && item.writer_name ? item.writer_name : "못찾음"}</span>
                        {/* <span>{item.text}</span> */}
                    </div>
                </CommentsList>
            ))}
        </CommentsColumn>
    )
}

export default withRouter(Comments)
