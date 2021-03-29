import React, { useEffect } from 'react'
import axios from "axios"

function Home() {

    useEffect(async () => {
        const {
            data
        } = await axios.post("/api/product/products")
        console.log(data)
    })

    return (
        <>
            <div>Home</div>
        </>
    )
}

export default Home
