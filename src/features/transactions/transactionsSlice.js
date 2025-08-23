import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/mockApi";
import { startLoading, stopLoading } from "../loader/loaderSpinSlice";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (accountId, { getState, rejectWithValue, dispatch }) => {
    try {
      dispatch(startLoading());
      const token = getState().auth.token;
      const res = await api.get(`/accounts/${accountId}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch transactions"
      );
    } finally {
      dispatch(stopLoading());
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: { list: [], loading: false, error: null, accountMeta: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.transactions;
        state.accountMeta = action.payload.account;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionsSlice.reducer;
