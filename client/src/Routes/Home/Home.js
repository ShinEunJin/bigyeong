import React, { useEffect } from "react"
import RepPage from "./RepPage"
import Category from "./Category"
import Footer from "../../Components/Footer"

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <RepPage />
      <Category />
      <Footer />
    </>
  )
}

export default Home
