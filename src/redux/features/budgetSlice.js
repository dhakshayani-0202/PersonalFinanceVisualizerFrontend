// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/appConstants";

const initialState = {
  budgets: [],
  isLoading: false,
  error: null,
  status: null,
};

export const createBudget = createAsyncThunk("budgets/create", async (budgetData, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}budget/createBudget`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(budgetData),
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

export const deleteBudgetById = createAsyncThunk("budgets/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}budget/deleteBudget/${id}`, {
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

export const getBudgetById = createAsyncThunk("budgets/get", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}budget/getBudgetById/${id}`, {
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

export const getAllBudgets = createAsyncThunk("budgets/getAll", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}budget/getAllBudgets`,);
    const data = await res.json();
    if (data.success) return data;
    return rejectWithValue(data.message);
  } catch (error) {
    return rejectWithValue(error.message || "An error occurred");
  }
});

export const updateBudget = createAsyncThunk(
  "budgets/updateBudget",
  async ({ id, updatedData }, { rejectWithValue }) => {
    console.log("UPDATEDDATA",updatedData)
    try {
      const res = await fetch(`${BASE_URL}budget/updateBudget/${id}`, {
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

const budgetsSlice = createSlice({
  name: "budgets",
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
      .addCase(createBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.budgets.push(action.payload.data);
      })
      .addCase(createBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });


    builder
      .addCase(deleteBudgetById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBudgetById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.budgets = state.budgets.filter((budget) => budget.id !== action.payload);
      })
      .addCase(deleteBudgetById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getBudgetById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBudgetById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.budgets = [action.payload];
      })
      .addCase(getBudgetById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getAllBudgets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBudgets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.budgets = action.payload.data;
      })
      .addCase(getAllBudgets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateBudget.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        const index = state.budgets.findIndex((rent) => rent.id === action.payload.id);
        if (index !== -1) {
          state.budgets[index] = { ...state.budgets[index], ...action.payload.updatedData };
        }
      })
      .addCase(updateBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "fail";
      })
  },
});

export const { emptyError, emptyStatus } = budgetsSlice.actions;
export default budgetsSlice.reducer;
