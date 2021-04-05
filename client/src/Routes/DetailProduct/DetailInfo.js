import React, { useEffect, useState } from 'react'
import { Descriptions, Button } from 'antd';
import styled from "styled-components"
import { HeartFilled, CaretUpOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux"
import { addTake } from '../../_actions/user_action';

const ButtonColumn = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px;
`

function DetailInfo(props) {

    const [product, setProduct] = useState({})

    const user = useSelector(state => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        if (props.product[0]) {
            setProduct(props.product[0])
        }
        console.log(user)
    }, [props.product[0]])

    const handleTakeBtn = () => {
        dispatch(addTake(props.product[0]._id))
        if (user.userData.take.isExisted) {
            alert("해당 상품이 이미 찜하기 목록에 있습니다.")
        } else {
            alert("해당 상품을 찜하기 목록에 넣었습니다.")
        }
    }

    return (
        <>
            <Descriptions title={`${product.name}`} layout="vertical" bordered>
                <Descriptions.Item label="지역">{product.region}</Descriptions.Item>
                <Descriptions.Item label="위치">{product.location}</Descriptions.Item>
                <Descriptions.Item label="조회수">{product.views}</Descriptions.Item>
                <Descriptions.Item label="설명">{product.description}</Descriptions.Item>
            </Descriptions>
            <br />
            <br />
            <ButtonColumn>
                <Button type="primary" size={"large"} block onClick={handleTakeBtn}><CaretUpOutlined />찜하기</Button>
                <Button type="primary" size={"large"} block danger><HeartFilled />좋아요</Button>
            </ButtonColumn>
        </>
    )
}

export default DetailInfo
