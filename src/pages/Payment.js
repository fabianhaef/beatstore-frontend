import React, {useState } from 'react';
import{ useDispatch, useSelector } from 'react-redux'

import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

import {savePaymentMethod} from '../actions/cartActions';

function Payment({history}) {

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  if(!shippingAddress.address) {
    history.push('/shipping')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <form onSubmit={submitHandler}>
        <label htmlFor='email'>Select Method</label>
        <input type='radio' placeholder="PayPal" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} checked/>

        <button type="subtmit">Submit Payment Method</button>
      </form>
    </FormContainer>
  )
}

export default Payment
