import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/mockApi";
import { startLoading, stopLoading } from "../loader/loaderSpinSlice";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(startLoading());
      const res = await api.post("/login", { username, password });
      const { token } = res.data;
      localStorage.setItem("token", token);
      return token;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    } finally {
      dispatch(stopLoading());
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
