import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import routes from "../../routes"

const Container = styled.div``

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Tr = styled.tr`
  border-bottom: 1px solid #dddddd;
  &:last-child {
    border-bottom: none;
  }
`

const Th = styled.th`
  background-color: gray;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
  font-size: 1.2em;
`

const Td = styled.td`
  padding: 10px;
  text-align: left;
  vertical-align: middle;
  height: 6vh;
`

const SLink = styled(Link)`
  &:hover {
    color: wheat;
  }
`

const Title = styled.div`
  width: 65vh;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

function List({ posts, page, length }) {
  return (
    <Container>
      <Table>
        <thead>
          <Tr>
            <Th>번호</Th>
            <Th>제목</Th>
            <Th>작성일</Th>
            <Th>조회수</Th>
          </Tr>
        </thead>
        <tbody>
          {posts &&
            posts.length > 0 &&
            posts.map((item, index) => (
              <Tr key={index}>
                <Td style={{ width: "10%", textAlign: "center" }}>
                  {item.number}
                </Td>
                <Td style={{ width: "60%" }}>
                  <SLink to={routes.post(item._id)}>
                    <Title>{item.title}</Title>
                  </SLink>
                </Td>
                <Td style={{ width: "20%", textAlign: "center" }}>
                  {item.date}
                </Td>
                <Td style={{ width: "10%", textAlign: "center" }}>
                  {item.views}
                </Td>
              </Tr>
            ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default List
