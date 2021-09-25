import React, {useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import{ useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Layout from '../components/Layout'

import {login} from '../actions/userActions';

function Login({location, history}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userLogin = useSelector(state => state.userLogin)
  const {error, loading, userInfo} = userLogin

  useEffect(() => {
    if(userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  }
  
  return (
    <Layout>
      <FormContainer>
        <h1>Login</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler}>
          <label htmlFor='email'>Email Adress</label>
          <input type='email' placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label htmlFor='password'>Password</label>
          <input type='password' placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" className="button-primary">Login</button>
        </form>
        <br />
        <p>New customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></p>
      </FormContainer>
    </Layout>
  )
}

export default Login
