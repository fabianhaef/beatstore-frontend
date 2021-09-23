import React, {useEffect} from 'react'

import {useDispatch, useSelector} from 'react-redux';

import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
import Paginate from '../components/Paginate'

import {listProducts} from '../actions/productActions'


function Beats() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products, page, pages} = productList
  const beats = products.filter(product => product.is_soundkit !== true)


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
            <div>
              <h2>Latest Beats</h2>
              {beats.map(beat => (
                <Product product={beat} key={beat._id}/>
              ))}
            </div>
            <Paginate page={page} pages={pages}/>
          </div>
      }

    </div>
  )
}

export default Beats
