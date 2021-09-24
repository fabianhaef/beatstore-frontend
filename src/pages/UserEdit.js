import React, {useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import{ useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Layout from '../components/Layout'

import {getUserDetails, updateUser} from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

function UserEdit({match, history}) {

  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const {error, loading, user} = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const {error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

  useEffect(() => {
    if(successUpdate) {
      dispatch({type: USER_UPDATE_RESET})
      history.push('/admin/userlist')
    } else {
      if(!user.name || user._id !== Number(userId)) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }

  }, [user, userId, successUpdate, history, dispatch])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({_id: user._id, name, email}))
  }

  return (
    <Layout>
      <Link to='/admin/userlist'>Go back to user list</ Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message>{errorUpdate}</Message>}
        
        {loading 
          ? <Loader /> 
          : error 
            ?
            <Message>{error}</Message>
            : (
              <form onSubmit={submitHandler}>
              <label htmlFor='email'>Name</label>
                <input type='text' placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required/>

                <label htmlFor='email'>Email Adress</label>
                <input type='email' placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

                <button type="submit">Update</button>
              </form>
            )}
      </FormContainer>
    </Layout>
  )
}

export default UserEdit
