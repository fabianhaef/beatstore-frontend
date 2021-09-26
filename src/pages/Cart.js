import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Layout from '../components/Layout'

function Cart({match, location, history }) {
  const productId = match.params.id

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.price), 0).toFixed(2)
  const taxPrice = (totalPrice / 100 * 7).toFixed(2)
  const cartTotal = (Number(totalPrice) + Number(taxPrice)).toFixed(2)

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
    <Layout >
      <div>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="error">Your card is empty <Link to="/">Go Back</Link></Message>
        ) : (
          <div>
            <h2>Your items</h2>
            <div className="box-list">
              {cartItems.map(item => (
                  <div key={item.title} className="box">
                    <div className="product-title-bar">
                      <h3 className="product-title">{item.title}</h3>
                      <h4 className="product-price">Price ${item.price}</h4>
                    </div>

                    <img src={item.image} alt={item.name} />
                    <br />

                    <button type="submit" className="button-secondary" onClick={() => removeFromCartHandler(item.product)}>Remove From cart</button>
                  </div>
              ))}
            </div>
          </div>
        )
      }
      <br />
      <h3>Your Total ${totalPrice}</h3>
      <p>Tax Price ${taxPrice}</p>
      <h4>Cart total ${cartTotal}</h4>
      {cartItems.length === 0 
        ? <button onClick={checkoutHandler} disabled className="button-secondary">Proceed to checkout</button>
        : <button onClick={checkoutHandler} className="button-primary">Proceed to checkout</button>
      }
      
      </div>

    </Layout>
  )
}

// Todo: cartTotal: lecture 27, min 15
//<h2>Subtotal ({cartItems.reduce((acc, item) => acc + item, 0)}) items</h2>
// <h2>Total: $ ({cartItems.reduce((acc, item) => acc + item.price, 0)})</h2>

export default Cart;