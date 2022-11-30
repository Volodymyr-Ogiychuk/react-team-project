import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://wallet.goit.ua/api/';

export const getTransactionsSummary = createAsyncThunk(
  'transactions-summary',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('transactions-summary');
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const getTransactionsTime = createAsyncThunk(
  'transactions-summary-time',
  async (data, thunkAPI) => {
    const { month, year } = data;
    try {
      const { data } = await axios.get(
        `transactions-summary?month=${month}&year=${year}`
      );
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
