import React from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`

const Column = styled.div`
  border-top: 1px solid #f4eee8;
  opacity: 0.5;
  margin-top: 3rem;
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
    <Container>
      <Column>
        <FooterContent>
          <P>Copyright © 2021 Shin.HT. All rights reserved.</P>
          <address>Contact maker for more information. 010-5501-2605</address>
        </FooterContent>
      </Column>
    </Container>
  )
}

export default Footer
