import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { getMyProducts } from "../../_actions/user_action"
import { Row, Card, Col } from "antd"
import { Link } from "react-router-dom"

const { Meta } = Card

const Container = styled.div`
  padding-top: 100px;
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
  box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, 0.3);
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

const RealAvatar = styled.img`
  height: 96px;
  width: 96px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin-bottom: 70px;
`

function MyProfile() {
  const { userData: user } = useSelector((state) => state.user)

  const [products, setProducts] = useState([])

  const dispatch = useDispatch()

  const myProducts = async () => {
    let newProducts = []
    const {
      payload: { product },
    } = await dispatch(getMyProducts())
    if (product && product.length > 0) {
      product.forEach((item) => newProducts.push(item))
      setProducts(newProducts)
    }
  }

  useEffect(() => {
    myProducts()
  }, [])

  return (
    <Container>
      <ProfleColumn>
        <Profile>
          {user && user.avatar ? (
            <RealAvatar src={user.avatar} />
          ) : (
            <Avatar
              style={{ marginBottom: 70 }}
              size={96}
              icon={<UserOutlined />}
            />
          )}
          <NameColumn>{user.name}</NameColumn>
          <EmailColumn>{user.email}</EmailColumn>
          <Button>
            <Link to="/user/update-profile">
              <Span>프로필 수정</Span>
            </Link>
          </Button>
        </Profile>
      </ProfleColumn>
      <Row gutter={[16, 16]}>
        {products.map((item, index) => (
          <Col key={index} lg={6} md={8} xs={24}>
            <Link to={`/product/${item._id}`}>
              <Card
                cover={<img style={{ height: 250 }} src={item.images[0]} />}
              >
                <Meta title={item.name} description={item.region} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default MyProfile
