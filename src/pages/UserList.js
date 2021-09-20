import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';

import{ useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../actions/userActions';

import Loader from '../components/Loader'
import Message from '../components/Message'

function UserList({history}) {

  const dispatch = useDispatch()

  const userList = useSelector(state => state.userList)
  const {loading, error, users} = userList

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  useEffect(() => {
    if(userInfo && userInfo.is_admin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <div>
      <h1>Users</h1>
      {loading 
      ?
      (<Loader />)
      : error
        ? (<Message>{error}</Message>)
        : (
          <div>
            {users.map(user => (
              <div key={user._id}>
                <p>ID {user._id}</p>
                <p>NAME {user.name}</p>
                <p>EMAIL {user._email}</p>
                <p>ADMIN {user.is_admin ? (
                <Link to={`/admin/user/${user._id}/edit`}>
                  <i className='fas fa-edit'></i>
                </ Link>                  
                ) : (
                  <i className="fas fa-check" style={{'color': 'red'}}></i>
                )}</p>
              </div>
            ))}
          </div>
        )}
      
    </div>
  )
}

export default UserList
