export const selectTransactions = state => state.transactions.transactions;
export const selectCategories = state => state.transactions.categories;
export const selectModalStatus = state =>
  state.transactions.isTransactionModalOpen;
