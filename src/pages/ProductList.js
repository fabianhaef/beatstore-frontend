import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';

import{ useDispatch, useSelector } from 'react-redux'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';

import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

function ProductList({history, match}) {

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const {loading, error, products, page, pages} = productList

  const productDelete = useSelector(state => state.productDelete)
  const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

  const productCreate = useSelector(state => state.productCreate)
  const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  let keyword = history.location.search
  useEffect(() => {
    dispatch({type: PRODUCT_CREATE_RESET})

    if(!userInfo.is_admin) {
      history.push('/login')
    } 

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit/`)
    } else {
      dispatch(listProducts(keyword))
    }

  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, keyword])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <div>
      <button onClick={createProductHandler}>
        <i className="fas fa-plus"></i> Create Product
      </button>

      {loadingDelete && <Loader />}
      {errorDelete && <Message>{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message>{errorCreate}</Message>}

      <h1>Products</h1>
      {loading 
      ?
      (<Loader />)
      : error
        ? (<Message>{error}</Message>)
        : (
          <div>
            <div>
              {products.map(product => (
                <div key={product._id}>
                  <p>ID {product._id}</p>
                  <p>NAME {product.title}</p>
                  <p>PRICE {product.price}</p>
                  <p>SOUNDKIT {product.is_soundkit}</p>
                  <Link to={`/admin/product/${product._id}/edit/`}>
                    <i className='fas fa-edit'></i>
                  </ Link>                  
                  <Link>
                    <button onClick={() => deleteHandler(product._id)}>
                      <i className="fas fa-check" style={{'color': 'red'}}></i>
                    </button>
                  </Link>
                </div>
              ))}
            </div>
            <Paginate pages={pages} page={page} isAdmin={true} />
          </div>
        )}
      
    </div>
  )
}

export default ProductList
