import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import styled from "styled-components"

function DetailImage(props) {

    const [imageState, setImageState] = useState([])

    useEffect(() => {
        if (props.product[0] && props.product[0].images.length > 0) {
            let newImages = []
            props.product[0].images.map(item => (
                newImages.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`
                })
            ))
            setImageState(newImages)
        }
    }, [props.product[0]])

    return (
        <div>
            <ImageGallery items={imageState} />
        </div>
    )
}

export default DetailImage
