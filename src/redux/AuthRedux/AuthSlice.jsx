const { createSlice } = require('@reduxjs/toolkit/dist');
const { LoginApi, fetchCurrentUser } = require('./operations');

const handlePending = state => {

    state.isLoggedIn = false;
};

const handleRejected = (state, action) => {
  state.error = action.payload;
  state.isLoggedIn = false;
};

const auth = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    isLoggedIn: false,
    token: null,
    error: null,
    balance: 0,
  },
  extraReducers: {
    [LoginApi.pending]: handlePending,
    [LoginApi.rejected]: handleRejected,
    [LoginApi.fulfilled](state, action) {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.balance = action.payload.balance;
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
