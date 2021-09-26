import React, {useEffect, useState } from 'react';
import{ useDispatch, useSelector } from 'react-redux';
import {PayPalButton} from 'react-paypal-button-v2'

import {Link} from 'react-router-dom';

import Layout from '../components/Layout'
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
    order.itemsPrice = Number(order.orderItems.reduce((acc, item) => acc + item.price, 0)).toFixed(2)
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
    <Layout >
        <h1>Your order #{order._id}</h1>
      <div>
        <h2>Shipping Information</h2>
        <p><strong>Name: </strong>{order.user.name}</p>
        <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
        <h2>Payment Method</h2>
        <p><strong>Method: </strong>{order.user.paymentMethod}</p>
        {order.is_paid ? (
          <Message>Paid on {order.paid_at.substring(0, 10)}</Message>
        ) : (
          <Message>Order not paid yet</Message>
        )}
        <h2>Order Items</h2>
        {order.orderItems.length === 0 
        ? <Message>Your Order is empty</Message>
        : (
          <div className="box-list">
            {order.orderItems.map((item, index) => (
              <div key={index} className="box">
                <div className="product-title-bar">
                      <h3 className="product-title">{item.name}</h3>
                      <h4 className="product-price">Price ${item.price}</h4>
                </div>
                <img src={item.image} alt={item.title} />
              </div>
            ))}
          </div>
          )
        }
        {!order.is_paid && (
          <div>
            {loadingPay && <Loader />}
            {!sdkReady ? (
              <Loader />
            ) : (
              <PayPalButton 
                amount={order.totalPrice} 
                onSuccess={successPaymentHandler}
              />
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default OrderScreen
