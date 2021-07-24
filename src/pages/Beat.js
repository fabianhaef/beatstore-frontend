import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {listProductDetails} from '../actions/productActions'

import Loader from '../components/Loader'
import Message from '../components/Message'

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
    <div>
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
      
            <div>
              <h5>Licences</h5>
              <p>Show all licences with prices</p>
            </div>
      
            <form method="POST">
              <button type="submit" onClick={addToCartHandler}>Add to cart</button>
            </form>
            <button>Add to Wishlist</button>
          </div>
          )
      }

    </div>
  )
}

export default Beat
