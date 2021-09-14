import React from 'react'
import {Link} from 'react-router-dom'

function CheckoutSteps({step1, step2, step3, step4}) {
  return (
    <div>
      <div className="link-container">
        {step1 ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link disabled>Login</Link>
        )}
      </div>

      <div className="link-container">
        {step2 ? (
          <Link to='/shipping'>Shipping</Link>
        ) : (
          <Link disabled>Shipping</Link>
        )}
      </div>
      <div className="link-container">
        {step1 ? (
          <Link to="/payment">Payment</Link>
        ) : (
          <Link disabled>Payment</Link>
        )}
      </div>
      <div className="link-container">
        {step4 ? (
          <Link to="/placeorder">Place Order</Link>
        ) : (
          <Link disabled>Place Order</Link>
        )}
      </div>
      
    </div>
  )
}

export default CheckoutSteps
