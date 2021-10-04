import React, {useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import{ useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Layout from '../components/Layout'

import {register} from '../actions/userActions';


function Register({location, history}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userRegister = useSelector(state => state.userRegister)
  const {error, loading, userInfo} = userRegister

  useEffect(() => {
    if(userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <Layout>

      <FormContainer>
        <div className="full-form">
          <h1>Register</h1>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <label className="inputLabel" htmlFor='email'>Name</label>
            <input className="inputField" type='text' placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required/>

            <label className="inputLabel" htmlFor='email'>Email Adress</label>
            <input className="inputField" type='email' placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

            <label className="inputLabel" htmlFor='password'>Password</label>
            <input className="inputField" type='password' placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

            <label className="inputLabel" htmlFor='confirmPassword'>Confirm Password</label>
            <input className="inputField" type='password' placeholder="Enter password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>

            <button type="submit" className="button-primary">Register</button>
          </form>
          <br />
          <p>Already a member? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link></p>
        </div>
      </FormContainer>
    </Layout>
  )
}

export default Register
