import React from 'react';
import { Link } from 'react-router-dom';

function Product({product}) {


  return (
    <div className="product">
      <div className="product-title-bar">
        <h3 className="product-title">{product.title}</h3>
        <h4>${product.price}</h4>
      </div>
      <p>{product.description}</p>
      <img src={product.image} alt={product.name} className="product-image"></img>
      <Link to={`/beats/${product._id}`}>
        Go to product
      </Link>
    </div>
  )
}

export default Product
