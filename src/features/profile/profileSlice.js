import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/mockApi";
import { startLoading, stopLoading } from "../loader/loaderSpinSlice";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      dispatch(startLoading());
      const token = getState().auth.token;
      const res = await api.get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile"
      );
    } finally {
      dispatch(stopLoading());
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
