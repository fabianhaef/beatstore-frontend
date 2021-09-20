import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import{ useDispatch, useSelector } from 'react-redux'

import { listOrders } from '../actions/orderActions';

import Loader from '../components/Loader'
import Message from '../components/Message'

function OrderList({history}) {

  const dispatch = useDispatch()

  const orderList = useSelector(state => state.orderList)
  const {loading, error, orders} = orderList

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  useEffect(() => {
    if(userInfo && userInfo.is_admin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <div>
      <h1>Orders</h1>
      {loading 
      ?
      (<Loader />)
      : error
        ? (<Message>{error}</Message>)
        : (
          <div>
            {orders.map(order => (
              <div key={order._id}>
                <p>ID {order._id}</p>
                <p>USER {order.user.username} User-ID: {order.user._id}</p>
                <p>DATE {order.created_at.substring(0, 10)}</p>
                <div>
                  <p>Items:</p>
                  {order.orderItems.map(item => (
                    <p>Name {item.name} Price: {item.price}</p>
                  ))}
                </div>
                <p>Total Price {order.totalPrice}</p>
                <p>{order.is_paid ? (
                  order.paid_at.substring(0, 10)
                ) : (
                  <i className='fas fa-check' style={{ color: 'red' }}></i>
                )}</p>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}

export default OrderList
