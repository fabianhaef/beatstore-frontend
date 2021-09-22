import React from 'react';
import { Link } from 'react-router-dom';

function Product({product}) {
  return (
    <div>
      <h3>{product.title}</h3>
      <h4>Price: {product.price}</h4>
      <Link to={`/beats/${product._id}`}>
        <img src={product.image} width="240" height="240" alt={product.name}></img>
      </Link>

    </div>
  )
}

export default Product
