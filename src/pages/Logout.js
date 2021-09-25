import React, {useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import{ useDispatch, useSelector } from 'react-redux'

import Layout from '../components/Layout'

function Logout({location, history}) {
  
  return (
    <Layout>
      <h1>Logout successful</h1>
    </Layout>
  )
}

export default Logout
