import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

import {listProducts} from '../actions/productActions'

function Home({history}) {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products, page, pages} = productList


  let keyword = history.location.search

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <div>
      <h1>Welcome to amphibian</h1>
      {loading ? <Loader />
        : error ? <Message variant='error'>{error}</Message>
          : 
          <div>
            <div>
              <h2>Latest Products</h2>
              {products.map(product => (
                <Product product={product} key={product._id}/>
              ))}
            </div>    
            <Paginate page={page} pages={pages} keyword={keyword}/>     
          </div>
      }
    </div>
  )
}

export default Home
