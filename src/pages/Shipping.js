import React, {useState } from 'react';
import{ useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {saveShippingAddress} from '../actions/cartActions';
import Layout from '../components/Layout'

function Shipping({history}) {

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()

  const [email, setEmail] = useState(shippingAddress.email)
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(saveShippingAddress({ address, city, postalCode, country, email }))
      history.push('/payment')
  }

  return (
    <Layout>

      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor='email'>Email</label>
          <input className="inputField" type='email' placeholder="Enter your email" value={email ? email : ''} onChange={(e) => setEmail(e.target.value)} required/>

          <label htmlFor='address'>Address</label>
          <input className="inputField" type='text' placeholder="Enter your name" value={address ? address : ''} onChange={(e) => setAddress(e.target.value)} required/>

          <label htmlFor='address'>City</label>
          <input className="inputField" type='text' placeholder="Enter your name" value={city ? city : ''} onChange={(e) => setCity(e.target.value)} required/>

          <label htmlFor='postalCode'>Postal Code</label>
          <input className="inputField" type='text' placeholder="Enter postal code" value={postalCode ? postalCode : ''} onChange={(e) => setPostalCode(e.target.value)} required/>

          <label htmlFor='country'>Country</label>
          <input className="inputField" type='text' placeholder="Enter country name" value={country ? country : ''} onChange={(e) => setCountry(e.target.value)} required/>

          <button type="submit" className="button-primary">Continue</button>
        </form>
      </FormContainer>
    </Layout>
  )
}

export default Shipping
