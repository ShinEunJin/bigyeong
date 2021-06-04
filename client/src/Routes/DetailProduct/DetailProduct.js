import React, { useState, useEffect } from "react"
import { withRouter } from "react-router"
import styled from "styled-components"
import DetailImage from "./DetailImage"
import DetailInfo from "./DetailInfo"
import Comments from "../../Components/utils/Comments"
import Loading from "../../Components/Loading"
import { useDispatch, useSelector } from "react-redux"
import { getProduct } from "../../_actions/product_action"

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 3rem;
`

function DetailProduct(props) {
  const dispatch = useDispatch()

  const { data, loading } = useSelector((state) => state.product)

  const [height, setHeight] = useState(false)

  const productId = props.match.params.id

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    window.scrollTo(0, 0)
    dispatch(getProduct({ id: productId }))
  }, [productId])

  const handleScroll = () => {
    setHeight(window.scrollY > window.outerHeight * 0.3)
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {data && data.product && (
            <>
              <DetailImage />
              <DetailInfo trigger={height} />
            </>
          )}

          <Comments />
        </Container>
      )}
    </>
  )
}

export default withRouter(DetailProduct)
