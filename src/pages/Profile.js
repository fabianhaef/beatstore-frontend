import React, {useState, useEffect } from 'react';

import{ useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Layout from '../components/Layout'
import Order from '../components/Order'

import {getUserDetails, updateUserProfile} from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';

import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'

function Profile({history}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { error, loading, user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector(state => state.orderListMy)
  console.log(orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy
  console.log(orders)

  useEffect(() => {
    if (!userInfo) {
        history.push('/login')
    } else {
        if (!user || !user.name || success || userInfo._id !== user._id ) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
        } else {
            setName(user.name)
            setEmail(user.email)
        }
    }
}, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({'id': user._id, 'name': name, 'email': email, 'password': password}))
      setMessage('')
    }
  }

  return (
    <Layout>
      <FormContainer>
        <h1>Update your profile</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler} className="form">
          <label htmlFor='email'>Name</label>
          <input className="inputField" type='text' placeholder='Enter name' value={name ? name : ''} onChange={(e) => setName(e.target.value)} required/>

          <label htmlFor='email'>Email Adress</label>
          <input className="inputField" type='email' placeholder="Enter email" value={email ? email : ''} onChange={(e) => setEmail(e.target.value)} required/>

          <label htmlFor='password'>Password</label>
          <input className="inputField" type='password' placeholder="Enter password" value={password ? password : ''} onChange={(e) => setPassword(e.target.value)} required/>

          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input className="inputField" type='password' placeholder="Enter password" value={confirmPassword ? confirmPassword : ''} onChange={(e) => setConfirmPassword(e.target.value)} required/>

          <button type="submit" className="button-primary">Update</button>
        </form>
      </FormContainer>

      <div className="container">
        <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message>{errorOrders}</Message>
          ) : (
            <div className="box-list">
              {orders.map(order => (
                <Order order={order} key={order._id}/>
              ))}
            </div>
          )}
      </div>
    </Layout>
  )
}

export default Profile
