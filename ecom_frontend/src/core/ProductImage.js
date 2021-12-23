import React from 'react'
import {API} from "../config"

const ProductImage = ({product,style}) => {
    

    return (
            <div className="card-img-top">
            <img
                src={`${API}/product/photo/${product._id}`}
                alt={product.name}
                className="m-1"
                style={style}
            />
            </div>
    )
}

export default ProductImage
