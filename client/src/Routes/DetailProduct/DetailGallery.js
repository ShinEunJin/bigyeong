import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { CSSTransition } from "react-transition-group"

function DetailGallery() {
  const [start, setStart] = useState(false)

  const { data } = useSelector((state) => state.product)

  useEffect(() => {
    setStart(true)
  }, [])

  return (
    <>
      <CSSTransition
        in={start}
        timeout={2000}
        classNames="gallery"
        unmountOnExit
      >
        <div
          style={{
            height: "100vh",
            width: "100%",
          }}
        >
          <img
            style={{ width: 300, height: 300 }}
            src={
              data &&
              data.product &&
              data.product.images &&
              data.product.images.length > 0 &&
              `http://localhost:5000/${data.product.images[0]}`
            }
          />
        </div>
      </CSSTransition>
    </>
  )
}

export default DetailGallery
