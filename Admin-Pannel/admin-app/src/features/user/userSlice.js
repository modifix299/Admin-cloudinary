import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
    users: [],
    user: {},
    isError: false,
    isAdded: false,
    isUpdated: false,
    isLoading: false,
    message: '',
}

// Get All Users reducer
export const getUsers = createAsyncThunk('users/getAll', async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await userService.getAllUsers(token);
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

// Get One Users reducer
export const getUser = createAsyncThunk('users/getOne', async (id, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.getOneUser(id,token);
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

// Create new User
export const createUser = createAsyncThunk('users/create',async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.createUser(data, token)
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

// Edit User
export const updateUser = createAsyncThunk('users/update',async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await userService.updateUser(data, token)
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

// Delete User
export const deleteUser = createAsyncThunk('users/delete',async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await userService.deleteUser(data, token)
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

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
      //get all users
        .addCase(getUsers.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getUsers.fulfilled, (state, action) => {
          state.isLoading = false
          state.users = action.payload
        })
        .addCase(getUsers.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
      //get one user
        .addCase(getUser.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getUser.fulfilled, (state, action) => {
          state.isLoading = false
          state.user = action.payload
        })
        .addCase(getUser.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
      //create new user
        .addCase(createUser.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createUser.fulfilled, (state, action) => {
          state.isLoading = false
          state.isAdded = true
          state.message = action.payload
        })
        .addCase(createUser.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
      //update user
        .addCase(updateUser.pending, (state) => {
          state.isLoading = true
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.isLoading = false
          state.isUpdated = true
          state.message = action.payload
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })

         //Delete user
         .addCase(deleteUser.pending, (state) => {
          state.isLoading = true
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
          state.isLoading = false
          state.isUpdated = true
          state.message = action.payload
        })
        .addCase(deleteUser.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
    },
})
  
export const { reset } = userSlice.actions
export default userSlice.reducer
  