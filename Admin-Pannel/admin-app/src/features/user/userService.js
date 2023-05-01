import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_BASE_URL}users/`;


// Get All Users action
const getAllUsers = async (token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    
    const response = await axios.get(API_URL, config)

    return response.data;
}

// Get  User action
const getOneUser = async (id,token) => {
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }
  
  const response = await axios.get(API_URL+'getOne/'+id, config)

  return response.data;
}

// Create New User action
const createUser = async (data,token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.post(API_URL+'create', data, config)
  
    return response.data
}

// UpdateUser action
const updateUser = async (data,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.patch(API_URL+'update', data, config)

  return response.data
}

// deleteUser action
const deleteUser = async (data,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.patch(API_URL+'delete', data, config)

  return response.data
}

const userService = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
}

export default userService
