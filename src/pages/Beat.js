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
            <div>
              <div className="product-detail">
                <div class="product-detail-infos">
                  <h4 className="product-title">{product.title} </h4>
                  <h5 className="product-price">${product.price}</h5>
                  <p className="product-description">{product.description}</p>
                  {product.is_soundkit === false ? (
                    <AudioPlayer audioFile={product.file}/>
                  ) : (
                    <p>This is a soundkit, can not play a preview</p>
                  )}
                </div>
                <div>
                  <img src={product.image} alt={product.name} width="512"/>
                </div>
              </div>

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
