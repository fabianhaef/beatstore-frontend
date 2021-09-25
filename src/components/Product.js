import React from 'react';
import { Link } from 'react-router-dom';

function Product({product}) {


  return (
    <div className="box">
      <div className="product-title-bar">
        <h3 className="product-title">{product.title}</h3>
        <h4 className="product-price">${product.price}</h4>
      </div>
      <p className="product-description">{product.description}</p>
      <img src={product.image} alt={product.name} className="product-image"></img>
      <Link to={`/beats/${product._id}`}>
        <button className="button-primary">Go to product</button>
      </Link>
    </div>
  )
}

export default Product
