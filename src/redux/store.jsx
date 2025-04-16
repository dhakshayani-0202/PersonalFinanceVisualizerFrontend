// store.js
import { configureStore } from "@reduxjs/toolkit";
import budgetSlice from "./features/budgetSlice";
import transactionSlice from "./features/transactionSlice";

const store = configureStore({
  reducer: {
    budget: budgetSlice,
    transactions: transactionSlice,
  },
});

export default store;
