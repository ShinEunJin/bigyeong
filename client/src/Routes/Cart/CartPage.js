import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { removeTake } from '../../_actions/user_action'

const Container = styled.div`
    width: 80%;
    margin: 0 auto;
`

const Table = styled.table`
    width:  100%;
    border: 1px solid black;
    border-collapse: collapse;
`

const Tr = styled.tr`
    border: 1px solid black;
`

const Td = styled.td`
    border: 1px solid black;
    width: 20%;
    padding: 10px 5px;
`

function CartPage(props) {

    const dispatch = useDispatch()

    const [productState, setProductState] = useState([])

    let takeList = []

    useEffect(async () => {
        if (props.user.userData && props.user.userData.take) {
            if (props.user.userData.take.length > 0) {
                props.user.userData.take.forEach(item => {
                    takeList.push(item.id)
                })
                try {
                    const { data: { product } } = await axios.get(`/api/product/take?id=${takeList}`)
                    setProductState(product)
                } catch (error) {
                    alert("찜목록을 불러오는데 실패했습니다.")
                }
            }
        }
    }, [props.user.userData])

    const handleRemoveTake = async (productId) => {
        const { payload: { product } } = await dispatch(removeTake(productId))
        setProductState(product)
    }

    return (
        <Container>
            <Table>
                <thead>
                    <Tr>
                        <Td>이미지</Td>
                        <Td>상품</Td>
                        <Td>가격</Td>
                        <Td>판매자</Td>
                        <Td>지우기</Td>
                    </Tr>
                </thead>
                <tbody>
                    {productState && productState.length > 0 && productState.map((item, index) => (
                        <Tr key={index}>
                            <Td><img style={{ width: 50, height: 50 }} src={`http://localhost:5000/${item.images[0]}`} /></Td>
                            <Td>{item.name}</Td>
                            <Td>{item.location}</Td>
                            <Td>{item.writer.name}</Td>
                            <Td><button onClick={() => handleRemoveTake(item._id)}>❌</button></Td>
                        </Tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default CartPage
