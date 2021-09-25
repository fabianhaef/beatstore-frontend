import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {listProductDetails} from '../actions/productActions'

import Loader from '../components/Loader'
import Message from '../components/Message'
import Layout from '../components/Layout'
import MusicPlayer from '../components/MusicPlayer';

function Beat({ match, history }) {
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = (event) => {
    event.preventDefault()

    history.push(`/cart/${match.params.id}`)
  }

  return (
    <Layout>
      <Link to='/'>Go Back</Link>
      {loading ?
        <Loader></Loader>
        : error 
          ? <Message variant='error'>{error}</Message>
          : (
          <div>
            <h4>{product.name} </h4>
            <h4>Price: {product.price} USD</h4>
            <img src={product.image} alt={product.name} />

            {product.is_soundkit === false ? (
              //< MusicPlayer file={product.file} />
              <p>Hello</p>
            ) : (
              <p>This is a soundkit, can not play a preview</p>
            )}
            
            <form method="POST">
              <button type="submit" className="button-primary" onClick={addToCartHandler}>Add to cart</button>
            </form>
          </div>
          )
      }

    </Layout>
  )
}

export default Beat
