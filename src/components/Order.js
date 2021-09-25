import React from 'react'

function Order({order, key}) {

  return (
    <div className="box">
      <div className="product-title-bar">
        <h3 className="product-title">#{order._id}</h3>
        <h4 className="product-price">Total ${order.totalPrice}</h4>
      </div>
      <h5>All order items:</h5>
      <div>
        {order.orderItems.map(item => (
          <p key={item.name}>{item.name} ${item.price}</p>
        ))}
      </div>
      <h5>Paid:</h5>
      {!order.is_paid ? (
        <p>You have not paid this order.</p>
      ) : (
        <p>Paid on {order.paid_at.substring(0, 10)} with {order.payment_method}</p>
      )}    
      <h5>Downloadables</h5>
    </div>
  )
}

export default Order
