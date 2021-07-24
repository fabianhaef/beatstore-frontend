import axios from 'axios';
import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS, 
    CART_SAVE_PAYMENT_METHOD
  } 
  from '../constants/cartConstants';

export const addToCart = (id) => async (dispatch, getState) => {
  const {data} = await axios.get(`http://127.0.0.1:8000/api/products/${id}`)

  console.log("My Data ", data)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      title: data.title,
      image: data.image,
      price: data.price,
      licenceVariation: data.licence_variation,
    }
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))


}


export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
