import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_BASE_URL}products/`;


// Get All Products action
const getAllProducts = async (token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    
    const response = await axios.get(API_URL, config)

    return response.data;
}

// Get One Products action
const getOneProduct = async (id,token) => {
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }
  
  const response = await axios.get(API_URL+'getOne/'+id, config)

  return response.data;
}

// Create New Product action
const createProduct = async (data,token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.post(API_URL+'create', data, config)
  
    return response.data
}

// UpdateProduct action
const updateProduct = async (data,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.patch(API_URL+'update', data, config)

  return response.data
}

const productService = {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
}

export default productService
