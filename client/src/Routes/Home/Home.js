import React, { useEffect } from "react"
import RepPage from "./RepPage"
import { useDispatch } from "react-redux"
import { getRepProduct } from "../../_actions/product_action"

function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getRepProduct())
  }, [dispatch])

  return (
    <>
      <RepPage />
    </>
  )
}

export default Home
