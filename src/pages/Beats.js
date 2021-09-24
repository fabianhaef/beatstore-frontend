import React, {useEffect} from 'react'

import {useDispatch, useSelector} from 'react-redux';

import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
import Paginate from '../components/Paginate'
import Layout from '../components/Layout'

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
    <Layout>
      <h1>Welcome to Beats</h1>
      {loading ? <Loader />
        : error ? <Message variant='error'>{error}</Message>
          : 
          <div>
            <div>
              <h2>Here are my latest beats</h2>
              <div className="product-list">
                {beats.map(beat => (
                  <Product product={beat} key={beat._id}/>
                ))}
              </div>
            </div>
            <Paginate page={page} pages={pages}/>
          </div>
      }

    </Layout>
  )
}

export default Beats
