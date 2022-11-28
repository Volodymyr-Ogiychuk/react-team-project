import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  extraReducers: {
    
  },
});

export const getIsLoggedIn = state => state.auth.isLoggedIn;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});


