import React from 'react';
import { Link } from 'react-router-dom';

import{ useDispatch, useSelector } from 'react-redux'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';

function ProductAdmin({product}) {
  const dispatch = useDispatch()


  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <div className="box">
      <div className="product-title-bar">
        <h3 className="product-title">{product.title}</h3>
        <h4 className="product-price">${product.price}</h4>
      </div>
      <div className="edit-bar">
        <Link to={`/admin/product/${product._id}/edit/`}>
          <i className='fas fa-edit'>Edit</i>
        </ Link>
        <Link>
          <button onClick={() => deleteHandler(product._id)}>
            <i className="fas fa-check" style={{'color': 'red'}}>Delete</i>
          </button>
        </Link>
      </div>
      <p className="product-description">{product.description}</p>
      <img src={product.image} alt={product.name} className="product-image"></img>
    </div>
  )
}

export default ProductAdmin
