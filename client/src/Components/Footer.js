import React from "react"
import styled from "styled-components"

const Background = styled.div`
  width: 100%;
  background-color: #faf3f3;
  border-top: 1px solid rgba(157, 190, 185, 0.5);
`

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`

const Column = styled.div`
  opacity: 0.5;
`

const FooterContent = styled.footer`
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.9;
`

const P = styled.p`
  margin-bottom: 0.5rem;
`

function Footer() {
  return (
    <Background>
      <Container>
        <Column>
          <FooterContent>
            <P>Copyright © 2021 Shin.HT. All rights reserved.</P>
            <address>Contact maker for more information. 010-5501-2605</address>
          </FooterContent>
          <FooterContent>
            <P>위 사이트는 순전히 프로그래밍 연습을 목적으로 만들었습니다.</P>
            <P>어떠한 상업적 이익도 없음을 알려드립니다.</P>
          </FooterContent>
        </Column>
      </Container>
    </Background>
  )
}

export default Footer
