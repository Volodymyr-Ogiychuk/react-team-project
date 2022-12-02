const { createSlice } = require('@reduxjs/toolkit/dist');
const { LoginApi, fetchCurrentUser, RegisterApi, ResetApi } = require('./operations');

const handlePending = state => {
  state.registerUser = false;
    state.isLoggedIn = false;
};

const handleRejected = (state, action) => {
  state.error = action.payload;
  state.isLoggedIn = false;
  state.registerUser = false;
};

const auth = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    isLoggedIn: false,
    token: null,
    error: null,
    balance: 0,
    registerUser: false
  },
  extraReducers: {
    [LoginApi.pending]: handlePending,
    [LoginApi.rejected]: handleRejected,
    [LoginApi.fulfilled](state, action) {
      state.username = action.payload.user.username;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.balance = action.payload.user.balance;
      state.error = null;
    },
    [RegisterApi.pending]: handlePending,
    [RegisterApi.rejected]: handleRejected,
    [RegisterApi.fulfilled](state, action) {
      state.username = action.payload.user.username;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.balance = action.payload.user.balance;
      state.error = null;
    },
    [ResetApi.pending]: handlePending,
    [ResetApi.rejected]: handleRejected,
    [ResetApi.fulfilled](state, action) {
        state.username = '';
        state.token = null;
        state.isLoggedIn = false;
        state.balance = 0;
        state.error = null;
    },
    [fetchCurrentUser.pending]: handlePending,
    [fetchCurrentUser.rejected]: handleRejected,
    [fetchCurrentUser.fulfilled](state, action) {
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.balance = action.payload.balance;
        state.error = null;
    },
  },
});

export const authSlice = auth.reducer;
