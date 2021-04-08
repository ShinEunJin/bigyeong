import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { removeTake } from '../../_actions/user_action'
import { FiShoppingBag } from "react-icons/fi"
import { FaTrashAlt } from "react-icons/fa"

const Container = styled.div`
    width: 80%;
    margin: 0 auto;
`

const Title = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 2.2em;
    font-weight: bold;
`

const Table = styled.table`
    width:  100%;
    border: 1px solid #dddddd;
    border-collapse: collapse;
`

const Tr = styled.tr`
    border: 1px solid #dddddd;
`

const Th = styled.th`
    border: 1px solid #dddddd;
    background-color: #FFEBCD;
    padding: 10px;
    text-align: center;
    vertical-align: middle;
    font-weight: bold;
    font-size: 1.2em;
`

const Td = styled.td`
    border: 1px solid #dddddd;
    font-size: 1.1em;
    padding: 10px;
    text-align: left;
    vertical-align: middle;
    font-weight: 600;
`

const SFaTrashAlt = styled(FaTrashAlt)`
    font-size: 2em;
    cursor: pointer;
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
                    console.log(error)
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
            <Title>
                <FiShoppingBag style={{ marginRight: 5 }} />찜목록
            </Title>
            <Table>
                <thead>
                    <Tr>
                        <Th>이미지</Th>
                        <Th>상품</Th>
                        <Th>가격</Th>
                        <Th>판매자</Th>
                        <Th>삭제</Th>
                    </Tr>
                </thead>
                <tbody>
                    {productState && productState.length > 0 && productState.map((item, index) => (
                        <Tr key={index}>
                            <Td style={{ width: '15%', textAlign: 'center' }}><img style={{ width: 100, height: 100 }} src={`http://localhost:5000/${item.images[0]}`} /></Td>
                            <Td style={{ width: '30%' }}>{item.name}</Td>
                            <Td style={{ width: '30%' }}>{item.location}</Td>
                            <Td style={{ width: '20%' }}>{item.writer.name}</Td>
                            <Td style={{ width: '5%', textAlign: 'center' }}><SFaTrashAlt onClick={() => handleRemoveTake(item._id)} /></Td>
                        </Tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default CartPage
