import React, { useEffect } from "react"
import RepPage from "./RepPage"
import Category from "./Category"

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <RepPage />
      <Category />
    </>
  )
}

export default Home
