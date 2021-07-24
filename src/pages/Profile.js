import React, {useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import{ useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

import {getUserDetails, updateUserProfile} from '../actions/userActions';

import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'

function Profile({history}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userRegister)
  const {error, loading, user} = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const {success} = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
        history.push('/login')
    } else {
        if (!user || !user.name || success || userInfo._id !== user._id) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(getUserDetails('profile'))
            // dispatch(listMyOrders())
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
    }
  }

  return (
    <FormContainer>
      <h1>Update your profile</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
      <label htmlFor='email'>Name</label>
        <input type='text' placeholder="Enter your name" value={name ? name : ''} onChange={(e) => setName(e.target.value)} required/>

        <label htmlFor='email'>Email Adress</label>
        <input type='email' placeholder="Enter email" value={email ? email : ''} onChange={(e) => setEmail(e.target.value)} required/>

        <label htmlFor='password'>Password</label>
        <input type='password' placeholder="Enter password" value={password ? password : ''} onChange={(e) => setPassword(e.target.value)} required/>

        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input type='password' placeholder="Enter password" value={confirmPassword ? confirmPassword : ''} onChange={(e) => setConfirmPassword(e.target.value)} required/>

        <button type="submit">Update</button>
      </form>
    </FormContainer>
  )
}

export default Profile
