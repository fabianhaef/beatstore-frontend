import React, {useEffect, useState } from 'react';
import{ useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';

import {saveShippingAddress} from '../actions/cartActions';
import {createOrder} from '../actions/orderActions';

import {ORDER_CREATE_RESET} from '../constants/orderConstants';



function PlaceOrder({history}) {

  const orderCreate = useSelector(state => state.orderCreate)
  const {order, error, success} = orderCreate


  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  
  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)
  cart.taxPrice = Number((0.077) * cart.itemsPrice).toFixed(2)
  cart.totalPrice = Number(Number(cart.itemPrice) + Number(cart.taxPrice)).toFixed(2)

  if(!cart.paymentMethod) {
    history.push('/payment')
  }


  useEffect(() => {
    if(success) {
      history.push(`/order/${order._id}`)
      dispatch({
        type: ORDER_CREATE_RESET
      })
    }
  }, [success, history])

  const placeOrder = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shipping_address: cart.shippingAddress,
      payment_method: cart.paymentMethod,
      items_price: cart.itemsPrice,
      tax_price: cart.taxPrice,
      total_price: cart.totalPrice
    }))
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div>
        <h1>Place your order</h1>
        <h2>Shipping adress</h2>
        <p>{cart.shippingAddress.address}, {cart.shippingAddress.city}</p>
        <p>{cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
        <h2>Payment method</h2>
        <p>{cart.paymentMethod}</p>
      </div>
      <div>
        <h2>Order Items</h2>
        {cart.cartItems.length === 0 
        ? <Message>Your Cart is empty</Message>
        : (
          <div>
            {cart.cartItems.map((item, index) => (
              <div key={index}>
                <Link to={`/product/${item.product}`}>{item.name} </Link>
                <h4>Price: {item.price} USD</h4>
                <img src={item.image} alt={item.name} />
              </div>
            ))}
          </div>
          )
        }
      </div>
      <div>
        {error && <Message variant='danger'>{error}</Message>}
        <button onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  )
}

export default PlaceOrder
