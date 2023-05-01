 import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';

const initialState = {
    products: [],
    product: {},
    isError: false,
    isAdded: false,
    isUpdated: false,
    isLoading: false,
    message: '',
}

// Get All Products reducer
export const getProducts = createAsyncThunk('products/getAll', async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await productService.getAllProducts(token);
        } catch (error) {
            const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
);

// Get One Products reducer
export const getProduct = createAsyncThunk('products/getOne', async (id, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token;
      return await productService.getOneProduct(id, token);
  } catch (error) {
      const message =
      (error.response &&
          error.response.data &&
          error.response.data.message) ||
      error.message ||
      error.toString()
      return thunkAPI.rejectWithValue(message)
  }
}
);

// Create new Product
export const createProduct = createAsyncThunk('products/create',async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.createProduct(data, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update Product
export const updateProduct = createAsyncThunk('products/update',async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await productService.updateProduct(data, token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}
)

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
      //get all users
        .addCase(getProducts.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getProducts.fulfilled, (state, action) => {
          state.isLoading = false
          state.products = action.payload
        })
        .addCase(getProducts.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
      //get one user
        .addCase(getProduct.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getProduct.fulfilled, (state, action) => {
          state.isLoading = false
          state.product = action.payload
        })
        .addCase(getProduct.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
      //create new user
        .addCase(createProduct.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createProduct.fulfilled, (state, action) => {
          state.isLoading = false
          state.isAdded = true
          state.message = action.payload
        })
        .addCase(createProduct.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
      //update user
        .addCase(updateProduct.pending, (state) => {
          state.isLoading = true
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
          state.isLoading = false
          state.isUpdated = true
          state.message = action.payload
        })
        .addCase(updateProduct.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
    },
})
  
export const { reset } = productSlice.actions
export default productSlice.reducer
  