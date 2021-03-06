import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';

import{ useDispatch, useSelector } from 'react-redux'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';

import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import Layout from '../components/Layout';
import ProductAdmin from '../components/ProductAdmin';

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

    if(userInfo === undefined) {
      history.push('/login')
    }

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
    <Layout>
      {loadingDelete && <Loader />}
      {errorDelete && <Message>{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message>{errorCreate}</Message>}

      <h1>Products</h1>
      <button onClick={createProductHandler} className="button-primary">
        <i className="fas fa-plus"></i> Create Product
      </button>
      {loading 
      ?
      (<Loader />)
      : error
        ? (<Message>{error}</Message>)
        : (
          <div>
            <div className="box-list">
              {products.map(product => (
                <ProductAdmin product={product} />
              ))}
            </div>
            <Paginate pages={pages} page={page} isAdmin={true} />
          </div>
        )}
    </Layout>
  )
}

export default ProductList
