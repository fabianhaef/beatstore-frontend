import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {listBeats} from '../actions/productActions'

import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'

function Beats() {
  const dispatch = useDispatch()
  const beatList = useSelector(state => state.productList)
  const {error, loading, products} = beatList

  useEffect(() => {
    dispatch(listBeats())

     
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

export default Beats
