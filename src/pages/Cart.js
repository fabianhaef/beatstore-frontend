import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

function Cart({match, location, history }) {
  const productId = match.params.id

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId))
    }
  }, [dispatch, productId])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  }

  return (
    <div>
      <div>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="error">Your card is empty <Link to="/">Go Back</Link></Message>
        ) : (
          <div>
            <h2>Your items</h2>
            {cartItems.map(item => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <img src={item.image} alt={item.name} />
                <p>Price</p>

                <button type="submit" onClick={() => removeFromCartHandler(item.product)}>Remove From cart</button>
              </div>
            ))}
          </div>
        )
      }
      </div>
      {cartItems.length === 0 
        ? <button onClick={checkoutHandler} disabled>Proceed to checkout</button>
        : <button onClick={checkoutHandler}>Proceed to checkout</button>
        }
    </div>
  )
}

// Todo: cartTotal: lecture 27, min 15
//<h2>Subtotal ({cartItems.reduce((acc, item) => acc + item, 0)}) items</h2>
// <h2>Total: $ ({cartItems.reduce((acc, item) => acc + item.price, 0)})</h2>

export default Cart;