import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"
import { Row, Card, Col, Modal, Button } from "antd"
import { Link, withRouter } from "react-router-dom"
import dotenv from "dotenv"
import { FaPlus } from "react-icons/fa"
import axios from "axios"

dotenv.config()

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
  text-align: center;
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
  overflow-wrap: break-word;
  width: 100%;
`

const UpdateButton = styled.button`
  position: absolute;
  bottom: 1rem;
  width: 90%;
  height: 3rem;
  background-color: #98ddca;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-weight: 600;
`

const DeleteButton = styled.button`
  position: absolute;
  bottom: 5rem;
  width: 90%;
  color: white;
  height: 3rem;
  background-color: #ff3333;
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
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin-bottom: 3rem;
`

const LoadMoreBtn = styled.button`
  width: 100%;
  border: 1px solid rgba(200, 200, 200, 0.8);
  background-color: rgba(255, 255, 255, 0.8);
  color: rgba(100, 100, 100, 0.9);
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 0.9em;
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 10vh;
`

const PasswordInput = styled.input`
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  width: 50%;
`

let skip = 0
let limit = 4
let changedSkip = 0
let loadMore = false

function MyProfile(props) {
  const { userData: user } = useSelector((state) => state.user)

  const [products, setProducts] = useState([])
  const [productsNum, setProductsNum] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [withdrawModal, setWithdrawModal] = useState(false)
  const [password, setPassword] = useState("")

  const getProducts = async (skip, limit) => {
    const { data } = await axios.get(
      `/api/users/products?userId=${user._id}&skip=${skip}&limit=${limit}`
    )
    if (data.success) {
      if (loadMore) {
        setProducts([...products, ...data.products])
      } else {
        setProducts(data.products)
      }
      setProductsNum(data.products.length)
    } else {
      alert("프로필 컨텐츠를 불러오는데 실패하였습니다.")
    }
  }

  useEffect(() => {
    getProducts(skip, limit)
  }, [])

  const loadMoreHandler = () => {
    loadMore = true
    changedSkip = changedSkip + limit
    getProducts(changedSkip, limit)
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
    setWithdrawModal(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const withdrawOk = async () => {
    const { data } = await axios.delete(
      `/api/users/delete?userId=${user._id}&password=${password}`
    )
    if (data.success) {
      props.history.push("/")
      setTimeout(() => {
        alert(
          "회원 탈퇴를 완료하였습니다. 지금까지 서비스를 이용해 주셔서 감사합니다."
        )
      }, 300)
    } else {
      alert(data.message)
    }
    setWithdrawModal(false)
  }

  const withdrawCancel = () => {
    setWithdrawModal(false)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <Container>
      <ProfleColumn>
        <Profile>
          {user && user.avatar ? (
            <RealAvatar
              src={
                process.env.NODE_ENV === "development"
                  ? `http://localhost:5000/${user.avatar}`
                  : user.avatar
              }
            />
          ) : (
            <Avatar
              style={{ marginBottom: "3rem" }}
              size={96}
              icon={<UserOutlined />}
            />
          )}
          <NameColumn>{user.name}</NameColumn>
          <EmailColumn>{user.email}</EmailColumn>
          <DeleteButton onClick={showModal}>
            <Span>회원 탈퇴</Span>
          </DeleteButton>
          <UpdateButton>
            <Link to="/user/update-profile">
              <Span>프로필 수정</Span>
            </Link>
          </UpdateButton>
        </Profile>
      </ProfleColumn>
      <Row gutter={[16, 16]}>
        {products.map((item, index) => (
          <Col key={index} lg={6} md={8} xs={24}>
            <Link to={`/product/${item._id}`}>
              <Card
                cover={
                  <img
                    style={{
                      height: 250,
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    src={
                      process.env.NODE_ENV === "development"
                        ? `http://localhost:5000/${item.images[0]}`
                        : item.images[0]
                    }
                  />
                }
              >
                <Meta title={item.name} description={item.region} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      {productsNum === limit && (
        <LoadMoreBtn onClick={loadMoreHandler}>
          <FaPlus />
        </LoadMoreBtn>
      )}
      <Modal
        title="회원 탈퇴"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="danger" onClick={handleOk}>
            확인
          </Button>,
          <Button key="cancle" onClick={handleCancel}>
            취소
          </Button>,
        ]}
      >
        <p>회원 탈퇴 과정을 계속 진행하시겠습니까?</p>
      </Modal>
      <Modal
        title="회원 탈퇴"
        visible={withdrawModal}
        onOk={withdrawOk}
        onCancel={withdrawCancel}
        footer={[
          <Button key="ok" type="danger" onClick={withdrawOk}>
            확인
          </Button>,
          <Button key="cancel" onClick={withdrawCancel}>
            취소
          </Button>,
        ]}
      >
        <p>
          회원 탈퇴를 위해 <span style={{ fontWeight: 600 }}>비밀번호</span>를
          입력해 주십시오.
        </p>
        <br />
        <PasswordInput
          type="password"
          value={password}
          onChange={onChangePassword}
        />
      </Modal>
    </Container>
  )
}

export default withRouter(MyProfile)
