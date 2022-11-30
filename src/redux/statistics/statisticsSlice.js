import { createSlice } from '@reduxjs/toolkit';
import { getTransactionsSummary } from './statisticsOperations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const statisticsSlice = createSlice({
  name: 'statistics',
  initialState: {
    categoriesSummary: [
      {
        name: 'Basic expenses',
        type: 'INCOME',
        total: 200,
      },
      {
        name: 'Products',
        type: 'INCOME',
        total: 400,
      },
      {
        name: 'Car',
        type: 'INCOME',
        total: 300,
      },
      {
        name: 'Self care',
        type: 'INCOME',
        total: 500,
      },
      {
        name: 'Child care',
        type: 'INCOME',
        total: 600,
      },
      {
        name: 'Household products',
        type: 'INCOME',
        total: 700,
      },
      {
        name: 'Education',
        type: 'INCOME',
        total: 800,
      },
      {
        name: 'Leisure',
        type: 'INCOME',
        total: 900,
      },
      {
        name: 'Other expenses',
        type: 'INCOME',
        total: 50,
      },
    ],
    incomeSummary: null,
    expenseSummary: null,
    periodTotal: null,
    year: null,
    month: null,
    error: null,
    isLoading: false,
  },
  extraReducers: {
    [getTransactionsSummary.pending]: handlePending,
    [getTransactionsSummary.rejected]: handleRejected,
    [getTransactionsSummary.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.isLoading = false;
      //   state.categoriesSummary = payload.categoriesSummary;
      //   state.incomeSummary = payload.incomeSummary;
      //   state.expenseSummary = payload.expenseSummary;
      //   state.periodTotal = payload.periodTotal;
      //   state.year = payload.year;
      //   state.month = payload.month;
    },
  },
});

export const statisticsReducer = statisticsSlice.reducer;
