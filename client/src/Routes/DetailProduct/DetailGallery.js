import React from "react"
import { withRouter } from "react-router"

function DetailGallery(props) {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        zIndex: 50,
        backgroundColor: "aqua",
        opacity: 0.7,
      }}
    ></div>
  )
}

export default withRouter(DetailGallery)
