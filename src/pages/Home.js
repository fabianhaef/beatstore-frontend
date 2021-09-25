import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import Layout from '../components/Layout'

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
    <Layout>
      <h1>Welcome to amphibian</h1>
      {loading ? <Loader />
        : error ? <Message variant='error'>{error}</Message>
          : 
          <div>
            <div>
              <h2>Here are my latest products</h2>
              <div className="box-list">
                {products.map(product => (
                  <Product product={product} key={product._id}/>
                ))}
                    
              </div>
            </div>    
            <Paginate page={page} pages={pages} keyword={keyword}/>     
          </div>
      }
    </Layout>
  )
}

export default Home
