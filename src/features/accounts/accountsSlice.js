import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/mockApi";
import { startLoading, stopLoading } from "../loader/loaderSpinSlice";

export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      dispatch(startLoading());
      const token = getState().auth.token;
      const res = await api.get("/accounts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch accounts"
      );
    } finally {
      dispatch(stopLoading());
    }
  }
);

const accountsSlice = createSlice({
  name: "accounts",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default accountsSlice.reducer;
