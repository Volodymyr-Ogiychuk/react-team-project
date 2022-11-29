export const selectTransactions = state => state.transactions.transactions;
export const selectModalStatus = state =>
  state.transactions.isTransactionModalOpen;
