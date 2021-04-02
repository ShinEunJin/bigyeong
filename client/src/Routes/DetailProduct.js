import React, { useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router'

function DetailProduct(props) {
    const productId = props.match.params.id

    useEffect(async () => {
        const {
            data: { success, product }
        } = await axios.get(`/api/product/detail?id=${productId}`)
        if (success) {
            console.log(product)
        } else {
            alert("해당 상품을 찾을 수 없습니다.")
        }
    }, [])

    return (
        <div>Hleo</div>
    )
}

export default withRouter(DetailProduct)
