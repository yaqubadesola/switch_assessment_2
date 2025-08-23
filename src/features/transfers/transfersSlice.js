import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/mockApi";

export const initiateTransfer = createAsyncThunk(
  "transfers/initiateTransfer",
  async (data, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await api.post("/transfers", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Transfer failed");
    }
  }
);

const transfersSlice = createSlice({
  name: "transfers",
  initialState: {
    status: null, // "pending" | "success" | "failed"
    error: null,
    reference: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = null;
      state.error = null;
      state.reference = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateTransfer.pending, (state) => {
        state.status = "pending";
        state.error = null;
        state.reference = null;
      })
      .addCase(initiateTransfer.fulfilled, (state, action) => {
        state.status = "success";
        state.reference = action.payload.reference;
      })
      .addCase(initiateTransfer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = transfersSlice.actions;
export default transfersSlice.reducer;
