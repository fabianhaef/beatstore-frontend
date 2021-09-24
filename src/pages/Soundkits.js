import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {listProducts} from '../actions/productActions'

import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
import Paginate from '../components/Paginate'
import Layout from '../components/Layout'

function Soundkits() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products, page, pages} = productList
  console.log("product", products)
  const soundkits = products.filter(product => product.is_soundkit === true)

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

    
  console.log("kits", soundkits)
  return ( 
    <Layout>
      <h1>Welcome to Soundkits</h1>
      {loading ? <Loader />
        : error ? <Message variant='error'>{error}</Message>
          : 
          <div>
            <div>
              <h2>Latest Kits</h2>
              <div className="product-list">
                {soundkits.map(soundkit => (
                  <Product product={soundkit} key={soundkit._id}/>
                ))}
              </div>
            </div>
            <Paginate page={page} pages={pages} />   
          </div>
      }
    </Layout>
  )
}

export default Soundkits
