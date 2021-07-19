import React, { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import routes from "../../routes"
import Fade from "react-reveal/Fade"
import Write from "./Write"
import { Pagination } from "antd"
import List from "./List"
import { FaPen } from "react-icons/fa"
import theme from "../../hoc/theme"
import { useMediaQuery } from "react-responsive"

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  position: relative; // Fade Write 위한 코드
  @media ${(props) => props.theme.tablet} {
    width: 100%;
    background-color: white;
    color: black;
    padding-top: 2vh;
  }
`

const Header = styled.header`
  margin-top: 5vh;
  height: 7vh;
  font-weight: 600;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  @media ${(props) => props.theme.tablet} {
    height: 7vh;
    margin: auto;
    width: 50vw;
  }
`

const Content = styled.div`
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  margin-bottom: 2rem;
`

const Button = styled.button`
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  background-color: #39655f;
  padding: 0.5em;
  width: 10vw;
  @media ${(props) => props.theme.tablet} {
    background-color: wheat;
    position: absolute;
    top: 2vh;
  }
`

function Board() {
  const LIMIT = 10

  const [reveal, setReveal] = useState(false) // 글쓰기란 트리거
  const [posts, setPosts] = useState([])
  const [length, setLength] = useState(0) //posts 개수
  const [currentPage, setCurrentPage] = useState(1)
  const [refresh, setRefresh] = useState(0) // 게시판 새로고침

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
  }, [refresh])

  //게시판 새로고침
  const refreshBoard = () => {
    setRefresh(refresh + 1)
  }

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

  const isTabletOrLaptop = useMediaQuery({ query: theme.tablet })

  return (
    <Container theme={theme}>
      {/* length는 게시판 목록 갯수 */}
      <Header theme={theme}>자유 게시판 ({length})</Header>

      <Fade bottom distance="2rem" duration={300} when={reveal}>
        {reveal && (
          <Write takeReveal={takeReveal} refreshBoard={refreshBoard} />
        )}
      </Fade>

      <Content>
        <List posts={posts} />
      </Content>
      <Pagination
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "2vh",
        }}
        current={currentPage}
        defaultCurrent={1}
        pageSize={LIMIT}
        onChange={(page) => onChangePage(page)}
        total={length}
      />
      <Button theme={theme} onClick={onRevealWrite}>
        <FaPen />
        {isTabletOrLaptop ? "" : "글쓰기"}
      </Button>
    </Container>
  )
}

export default Board
