
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import axios from "axios";

axios.defaults.baseURL = "https://wallet.goit.ua/api/"

const token = {
    set(token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
      axios.defaults.headers.common.Authorization = '';
    },
  };

export const LoginApi = createAsyncThunk(
    'auth/login',
    async (sign, { rejectWithValue }) => {
      try {
        const { data } = await axios.post('auth/sign-in', sign);
        token.set(data.token);
        console.log(data);
        return data;
      } catch (error) {
        return rejectWithValue( error.message);
      }
    }
  );

  export const fetchCurrentUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;
  
      if (persistedToken === null) {
        return thunkAPI.rejectWithValue();
      }
      token.set(persistedToken);
      try {
        const { data } = await axios.get('users/current');
        return data;
      } catch (error) {
        console.log(error.message);
      }
    }
  );