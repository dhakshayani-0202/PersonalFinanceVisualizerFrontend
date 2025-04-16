// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/appConstants";

const initialState = {
  transactions: [],
  isLoading: false,
  error: null,
  status: null,
};

export const createTransaction = createAsyncThunk("transactions/create", async (transactionData, { rejectWithValue }) => {
  try {
    console.log("WORLDATa", transactionData)
    const res = await fetch(`${BASE_URL}transaction/createTransaction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionData),
    });
    const data = await res.json();

    if (data.success) {
      return data;
    } else {
      return rejectWithValue(data.message);
    }
  } catch (error) {
    return rejectWithValue(error.message || "An error occurred");
  }
});

export const deleteTransactionById = createAsyncThunk("transactions/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}transaction/deleteTransaction/${id}`, {
      method: "DELETE",
      headers: {
      },
    });
    const data = await res.json();

    if (data.success) {
      return id;
    } else {
      return rejectWithValue(data.message);
    }
  } catch (error) {
    return rejectWithValue(error.message || "An error occurred");
  }
});

export const getTransactionById = createAsyncThunk("transactions/get", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}transaction/getTransactionById/${id}`, {
      method: "GET",

    });
    const data = await res.json();

    if (data.success) {
      return data.data;
    } else {
      return rejectWithValue(data.message);
    }
  } catch (error) {
    return rejectWithValue(error.message || "An error occurred");
  }
});

export const getAllTransactions = createAsyncThunk("transactions/getAll", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}transaction/getAllTransactions`,);
    const data = await res.json();
    if (data.success) return data;
    return rejectWithValue(data.message);
  } catch (error) {
    return rejectWithValue(error.message || "An error occurred");
  }
});

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ id, updatedData }, { rejectWithValue }) => {
    console.log("UPDATEDDATA",updatedData)
    try {
      const res = await fetch(`${BASE_URL}transaction/updateTransaction/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (data.success) return { id, updatedData: data.data };
      return rejectWithValue(data.message);
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    emptyError: (state) => {
      state.error = null;
    },
    emptyStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.push(action.payload.data);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });


    builder
      .addCase(deleteTransactionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTransactionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload);
      })
      .addCase(deleteTransactionById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getTransactionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = [action.payload];
      })
      .addCase(getTransactionById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getAllTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload.data;
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateTransaction.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        const index = state.transactions.findIndex((rent) => rent.id === action.payload.id);
        if (index !== -1) {
          state.transactions[index] = { ...state.transactions[index], ...action.payload.updatedData };
        }
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "fail";
      })
  },
});

export const { emptyError, emptyStatus } = transactionsSlice.actions;
export default transactionsSlice.reducer;
