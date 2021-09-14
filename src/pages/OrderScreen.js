import React, {useEffect, useState } from 'react';
import{ useDispatch, useSelector } from 'react-redux';
import {PayPalButton} from 'react-paypal-button-v2'

import {Link} from 'react-router-dom';

import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';

import {getOrderDetails, payOrder} from '../actions/orderActions';

import { ORDER_PAY_RESET } from '../constants/orderConstants'

function OrderScreen({match}) {
  const orderId = match.params.id
  const dispatch = useDispatch()


  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector(state => state.orderDetail)
  const { order, error, loading } = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  
  if(!loading &&!error) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)
  }

  const addPayPalScript = () => {
    const script = document.createElement('script');
    script.type = 'text/javascript'
    script.src = 'https://www.paypal.com/sdk/js?client-id=AbF20gjRz56j4QJgE6ezsBo2NbgqwS10ra1ieoN8LlIJMlppcmd9G9DCXp0S-FracX1oQ0fMWKl_imLn'
    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }

    document.body.appendChild(script)
  }

  useEffect(() => {
    if(!order || successPay ||order._id !== Number(orderId)) {
      dispatch({type: ORDER_PAY_RESET})
      dispatch(getOrderDetails(orderId))
    } else if(!order.isPaid) {
      if(!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, order, orderId, successPay])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }


  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <div>
        <h1>Your order #{order._id}</h1>
      <div>
        <h2>Shipping Information</h2>
        <p><strong>Name: </strong>{order.user.name}</p>
        <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
        <h2>Payment Method</h2>
        <p><strong>Method: </strong>{order.user.paymentMethod}</p>
        {order.isPaid ? (
          <Message>Paid on {order.paidAt}</Message>
        ) : (
          <Message>Order not paid yet</Message>
        )}
        <h2>Order Items</h2>
        {order.orderItems.length === 0 
        ? <Message>Your Order is empty</Message>
        : (
          <div>
            {order.orderItems.map((item, index) => (
              <div key={index}>
                <Link to={`/product/${item.product}`}>{item.name} </Link>
                <h4>Price: {item.price} USD</h4>
                <img src={item.image} alt={item.name} />
              </div>
            ))}
          </div>
          )
        }

        {!order.isPaid && (
          <div>
            {loadingPay && <Loader />}
            {!sdkReady ? (
              <Loader />
            ) : (
              <PayPalButton 
                amount='10' 
                onSuccess={successPaymentHandler}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderScreen