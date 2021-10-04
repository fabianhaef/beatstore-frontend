import React, {useState } from 'react';
import{ useDispatch, useSelector } from 'react-redux'

import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import Layout from '../components/Layout'

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
    <Layout>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment</h1>
        <form onSubmit={submitHandler} className="payment-form">
          <label className="select-payment-method">Select a payment method</label>
          <label className="payment-method">
            <input type='radio' placeholder="PayPal" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} checked/>
            Paypal
          </label>

          <button type="submit" className="button-primary">Submit Payment Method</button>
        </form>
      </FormContainer>
    </Layout>
  )
}

export default Payment
