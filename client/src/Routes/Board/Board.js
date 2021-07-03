import React, { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { Link } from "react-router-dom"
import routes from "../../routes"
import Fade from "react-reveal/Fade"
import Write from "./Write"
import { Pagination } from "antd"
import List from "./List"
import { FaTimes, FaPen } from "react-icons/fa"

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  position: relative; // Fade Write 위한 코드
`

const Header = styled.header`
  margin-top: 5vh;
  height: 7vh;
  font-weight: 600;
  font-size: 1.5em;
  display: flex;
  align-items: center;
`

const Content = styled.div`
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  height: 70vh;
`

const Button = styled.button`
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  background-color: #39655f;
  padding: 0.5em;
  width: 10vw;
`

function Board() {
  const LIMIT = 10

  const [reveal, setReveal] = useState(false) // 글쓰기란 트리거
  const [posts, setPosts] = useState([])
  const [length, setLength] = useState(0) //posts 개수
  const [currentPage, setCurrentPage] = useState(1)

  const getPosts = async (skip, limit) => {
    const { data } = await axios.get(
      `${routes.apiPosts}?skip=${skip}&limit=${limit}`
    )
    if (data.success) {
      setPosts(data.posts)
      setLength(data.postsLength)
    } else {
      alert("게시글을 불러오는데 실패하였습니다.")
    }
  }

  useEffect(() => {
    getPosts(0, LIMIT)
  }, [])

  const takeReveal = (state) => {
    setReveal(state) // 자식 컴포넌트 (Write) 에서 state = false 받기
  }

  const onRevealWrite = () => {
    if (reveal) {
      setReveal(false)
    } else {
      setReveal(true)
    }
  }

  const onChangePage = (page) => {
    setCurrentPage(page)
    getPosts((page - 1) * LIMIT, LIMIT)
  }

  return (
    <Container>
      <Header>자유 게시판 ({length})</Header>

      <Fade bottom distance="2rem" duration={300} when={reveal}>
        {reveal && <Write takeReveal={takeReveal} />}
      </Fade>

      <Content>
        <List posts={posts} />
      </Content>
      <Pagination
        style={{
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          bottom: 0,
          width: 100,
          left: "50%",
          marginLeft: -50,
        }}
        current={currentPage}
        defaultCurrent={1}
        pageSize={LIMIT}
        onChange={(page) => onChangePage(page)}
        total={length}
      />
      <Button onClick={onRevealWrite}>
        <FaPen />
        글쓰기
      </Button>
    </Container>
  )
}

export default Board
