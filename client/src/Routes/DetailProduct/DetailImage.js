import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';

function DetailImage(props) {

    const [imageState, setImageState] = useState([])

    useEffect(() => {
        if (props.product && props.product.images && props.product.images.length > 0) {
            let newImages = []
            props.product.images.map(item => (
                newImages.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`
                })
            ))
            setImageState(newImages)
        }
    }, [props.product])

    return (
        <div>
            <ImageGallery items={imageState} />
        </div>
    )
}

export default DetailImage