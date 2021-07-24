import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProducts} from '../actions/productActions'

function Home() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products} = productList

  useEffect(() => {
    dispatch(listProducts())

     
  }, [dispatch])

  return (
    <div>
      <h1>Welcome to amphibian</h1>
      {loading ? <Loader />
        : error ? <Message variant='error'>{error}</Message>
          : 
          <div>
            <h2>Latest Products</h2>
            {products.map(product => (
              <Product product={product} key={product._id}/>
            ))}
          </div>
      }

    </div>
  )
}

export default Home
