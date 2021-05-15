import React, { useState } from "react"
import styled from "styled-components"
import KoreaMap from "./KoreaMap"
import dotenv from "dotenv"
import { Link } from "react-router-dom"

dotenv.config()

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  padding-top: 3rem;
  background-color: #3edbf0;
`

const SogoImg = styled.img`
  height: 6rem;
  width: 6rem;
`

const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 700;
`

const MapSection = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

function Map() {
  const [products, setProducts] = useState([])

  const getProducts = (products) => {
    setProducts(products)
    console.log(products)
  }

  return (
    <Container id="map">
      {/* <Column>
        <SogoImg src={process.env.REACT_APP_DEV_PORT + "/logo/logo2.png"} />
        한국의 坊坊曲曲
      </Column> */}
      <MapSection>
        <KoreaMap getProducts={getProducts} />
        <>
          {products &&
            products.length > 0 &&
            products.map((item, index) => (
              <div key={index}>
                <Link to={`/product/${item._id}`}>{item.name}</Link>
              </div>
            ))}
        </>
      </MapSection>
    </Container>
  )
}

export default Map
