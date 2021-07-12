import React, { useEffect } from "react"
import RepPage from "./RepPage"
import { useDispatch } from "react-redux"
import { getRepProduct } from "../../_actions/product_action"

function Home(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getRepProduct())
  }, [dispatch])

  return (
    <>
      <RepPage theme={props.theme} />
    </>
  )
}

export default Home
