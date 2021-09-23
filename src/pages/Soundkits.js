import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {listProducts} from '../actions/productActions'

import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'

function Soundkits() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products, page, pages} = productList
  const soundkits = products.filter(product => product.is_soundkit === true)

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <div>
      <h1>Welcome to Soundkits</h1>
      {loading ? <Loader />
        : error ? <Message variant='error'>{error}</Message>
          : 
          <div>
            <h2>Latest Kits</h2>
            {soundkits.map(soundkit => (
              <Product product={soundkit} key={soundkit._id}/>
            ))}
          </div>
      }

    </div>
  )
}

export default Soundkits
