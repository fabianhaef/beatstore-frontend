import React, {useEffect   } from 'react';
import{ useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

import Layout from '../components/Layout'
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';

import {createOrder} from '../actions/orderActions';

import {ORDER_CREATE_RESET} from '../constants/orderConstants';



function PlaceOrder({history}) {

  const orderCreate = useSelector(state => state.orderCreate)
  const {order, error, success} = orderCreate

  const dispatch = useDispatch()
  
  const cart = useSelector(state => state.cart)
  
  cart.itemsPrice = Number(cart.cartItems.reduce((acc, item) => acc + Number(item.price), 0))
  cart.taxPrice = Number((0.082) * cart.itemsPrice).toFixed(2)
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice)).toFixed(2)

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
    <Layout >
      <CheckoutSteps step1 step2 step3 step4 />
      <h1>Place your order</h1>
      <div className="place-order-infos">
        <div className="box">
          <h2>Shipping adress</h2>
          <a href={`mailto:${cart.shippingAddress.email}`}>{cart.shippingAddress.email}</a>
          <p>{cart.shippingAddress.address}, {cart.shippingAddress.city}</p>
          <p>{cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
        </div>
        <div className="box">
          <h2>Payment method</h2>
          <p>{cart.paymentMethod}</p>
        </div>
        <div className="box">
          <h3>Cart Total Price</h3>
          <h4>${Number(cart.totalPrice)}</h4>
          {error && <Message variant='danger'>{error}</Message>}
          <button onClick={placeOrder} className="button-primary">Place Order</button>
        </div>
      </div>
      <div>
        <h2>Order Items</h2>
        {cart.cartItems.length === 0 
        ? <Message>Your Cart is empty</Message>
        : (
          <div className="box-list">
            {cart.cartItems.map((item, index) => (
              <div key={item.title} className="box">
              <div className="product-title-bar">
                <h3 className="product-title">{item.title}</h3>
                <h4 className="product-price">Price ${item.price}</h4>
              </div>
              <img src={item.image} alt={item.name} />
            </div>
            ))}
          </div>
          )
        }
        
        
      </div>
      <div>
      </div>
    </Layout>
  )
}

export default PlaceOrder
