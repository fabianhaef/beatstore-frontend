import React, {useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';

import{ useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

import {listProductDetails, updateProduct} from '../actions/productActions';

import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';


function ProductEdit({match, history}) {

  const productId = match.params.id

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [file, setFile] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { error, loading, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

  useEffect(() => {

    if(successUpdate) {
      dispatch({type: PRODUCT_UPDATE_RESET})
      history.push('/admin/productlist')
    } else {
        if(!product.title || product._id !== Number(productId)) {
          dispatch(listProductDetails(productId))
        } else {
          setTitle(product.title)
          setPrice(product.price)
          setDescription(product.description)
          setImage(product.image)
          setFile(product.file)
        }
    }

  }, [dispatch, product, productId, history, successUpdate])


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
      _id: product._id,
      title,
      price,
      description,
      image,
      file
    }))
  }

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('image', file)
    formData.append('product_id', productId)

    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',

        }
      }

      const {data} = await axios.post('/api/products/upload/image/', formData, config)
      setUploading(false)
      setImage(data)

    } catch(error) {
      setUploading(false)
    }
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('file', file)
    formData.append('product_id', productId)

    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',

        }
      }

      const {data} = await axios.post('/api/products/upload/file/', formData, config)
      setUploading(false)
      setFile(data)

    } catch(error) {
      setUploading(false)
    }
  }


  return (
    <div>
      <Link to='/admin/productlist'>Go back to product list</ Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message>{errorUpdate}</Message>}

        {loading && <Loader />}
        {error&& <Message>{error}</Message>}
        
        {loading 
          ? <Loader /> 
          : error 
            ?
            <Message>{error}</Message>
            : (
              <form onSubmit={submitHandler}>
              <label htmlFor='title'>Title</label>
              <input type='text' placeholder="Enter your name" value={title} onChange={(e) => setTitle(e.target.value)} required/>

              <label htmlFor='price'>Price</label>
              <input type='number' placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} required/>

              <label htmlFor='description'>Description</label>
              <input type='text' placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
              
              <form id="image-file" onChange={uploadImageHandler}>
                <label>Choose Your Product Image </label>
                <input type="file" id="docpicker" accept=".png, .jpg"></input>
              </form>
              {uploading && <Loader />}

              <form id="music-file" onChange={uploadFileHandler}>
                <label>Choose Your Music File </label>
                <input type="file" id="docpicker" accept=".wav, .mp3"></input>
              </form>
              {uploading && <Loader />}
              
              <button type="submit">Update</button>
              </form>
            )}
      </FormContainer>
    </div>
  )
}

export default ProductEdit
