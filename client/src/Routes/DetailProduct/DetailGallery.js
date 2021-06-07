import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Fade from "react-reveal/Fade"

function DetailGallery() {
  const [start, setStart] = useState(false)
  const [photo, setPhoto] = useState(false)

  const {
    data: { product },
  } = useSelector((state) => state.product)

  useEffect(() => {
    window.scrollTo(0, 0)
    setStart(true)
  }, [product])

  const onRevealHandler = () => {
    setPhoto(true)
  }

  return (
    <Fade bottom big in={start} mountOnEnter onReveal={onRevealHandler}>
      <div
        style={{
          position: "absolute",
          top: "3rem",
          zindex: 50,
          height: "100vh",
          width: "100%",
          backgroundColor: "aqua",
        }}
      >
        <Fade bottom in={photo}>
          {product.images.map((item, value) => (
            <img
              style={{ width: 300, height: 300 }}
              src={`http://localhost:5000/${item}`}
            />
          ))}
        </Fade>
      </div>
    </Fade>
  )
}

export default DetailGallery
