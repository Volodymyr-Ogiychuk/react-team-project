import { createSlice } from '@reduxjs/toolkit';
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  getCategories,
} from './transactions-operations';

function handlePending(state) {
  state.isLoading = true;
}

function isRejectedAction(action) {
  return action.type.endsWith('rejected');
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    catagories: [],
    isLoading: false,
    isTransactionModalOpen: false,
    error: null,
  },
  reducers: {
    toggleModal(state) {
      state.isTransactionModalOpen = !state.isTransactionModalOpen;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTransactions.pending, handlePending)
      .addCase(getTransactions.fulfilled, (state, { payload }) => {
        state.transactions = payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(addTransaction.pending, handlePending)
      .addCase(addTransaction.fulfilled, (state, { payload }) => {
        state.transactions.push(payload);
        state.error = null;
        state.isLoading = false;
      })
      .addCase(deleteTransaction.pending, handlePending)
      .addCase(deleteTransaction.fulfilled, (state, { payload }) => {
        const index = state.transactions.findIndex(
          transaction => transaction.id === payload.id
        );
        state.transactions.splice(index, 1);
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.catagories = payload;
        state.error = null;
        state.isLoading = false;
      })
      .addMatcher(isRejectedAction, (state, { payload }) => {
        console.log('reject:', payload);
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { toggleModal } = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;
