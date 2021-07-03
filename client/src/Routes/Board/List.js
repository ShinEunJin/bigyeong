import React from "react"
import styled from "styled-components"

const Container = styled.div`
  height: 100%;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  height: 100%;
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
  height: 10%;
`

function List({ posts }) {
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
        <tbody style={{ height: "10%" }}>
          {posts &&
            posts.length > 0 &&
            posts.map((item, index) => (
              <Tr key={index}>
                <Td style={{ width: "10%", textAlign: "center" }}>
                  {index + 1}
                </Td>
                <Td style={{ width: "60%" }}>{item.title}</Td>
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
