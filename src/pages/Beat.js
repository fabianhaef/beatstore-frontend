import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {listProductDetails} from '../actions/productActions'

import Loader from '../components/Loader'
import Message from '../components/Message'
import Layout from '../components/Layout'
import {AudioPlayer} from '../components/AudioPlayer';

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
            <div className="beat">
              <img className="beat-background" alt="beat cover background" src={product.image} />
              {product.is_soundkit === false ? (
              < AudioPlayer file={product.file} />
              ) : (
                ''
              )}
              <h4 className="beat-title">{product.title} </h4>
              <h5 className="beat-price">${product.price}</h5>
              <p className="beat-description">{product.description}</p>
            </div>

              

          )
      }
      <form method="POST">
        <button type="submit" className="button-primary" id="beat-add-to-cart"onClick={addToCartHandler}>Add to cart</button>
      </form>
    </Layout>
  )
}

export default Beat
