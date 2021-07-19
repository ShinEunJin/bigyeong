import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import routes from "../../routes"
import theme from "../../hoc/theme"
import { useMediaQuery } from "react-responsive"

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
  @media ${(props) => props.theme.tablet} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    height: 10vh;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    &:first-child {
      border-top: 1px solid rgba(0, 0, 0, 0.5);
    }
  }
`

const Title = styled.div`
  width: 65vh;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

// mobile
const MobileTitle = styled.div`
  font-weight: 600;
`

const MobileInfo = styled.div`
  opacity: 0.7;
  font-size: 0.9em;
`

function List({ posts }) {
  const isTabletOrLaptop = useMediaQuery({ query: theme.tablet })
  return (
    <Container>
      {isTabletOrLaptop ? (
        /* 모바일 모드 일 때 */
        <>
          {posts &&
            posts.length > 0 &&
            posts.map((item, index) => (
              <SLink key={index} to={routes.post(item._id)}>
                <MobileTitle>{item.title}</MobileTitle>
                <MobileInfo>
                  {item.date} | {item.views}
                </MobileInfo>
              </SLink>
            ))}
        </>
      ) : (
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
                    <SLink theme={theme} to={routes.post(item._id)}>
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
      )}
    </Container>
  )
}

export default List
