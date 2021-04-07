import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from "styled-components"
import axios from 'axios'

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

function CartPage() {

    const user = useSelector(state => state.user)

    const [productState, setProductState] = useState([])

    let getProduct = []
    let newList = []

    useEffect(() => {
        if (user.userData && user.userData.take) {
            if (user.userData.take.length > 0) {
                user.userData.take.forEach(item => {
                    getProduct.push(item.id)
                })
                getProduct.forEach(async (productId) => {
                    const { data: { product } } = await axios.get(`/api/product/detail?id=${productId}`)
                    newList.push(product)
                })
                setProductState(newList)
            }
        }
    }, [])
    console.log("newList", newList.length)
    console.log("productState", productState.length)

    return (
        <Container>
            <Table>
                <thead>
                    <Tr>
                        <Td>이미지</Td>
                        <Td>상품</Td>
                        <Td>갯수</Td>
                        <Td>가격</Td>
                        <Td>판매자</Td>
                    </Tr>
                </thead>
                <tbody>
                    {productState && productState.length > 0 && productState.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.views}</Td>
                            <Td>{item.name}</Td>
                            <Td>{item.region}</Td>
                            <Td>{item.location}</Td>
                            <Td>{item.writer.name}</Td>
                        </Tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default CartPage
