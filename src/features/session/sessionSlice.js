import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastActivity: Date.now(),
  warning: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    updateActivity: (state) => {
      state.lastActivity = Date.now();
      state.warning = false;
    },
    showWarning: (state) => {
      state.warning = true;
    },
    logoutSession: (state) => {
      state.lastActivity = null;
      state.warning = false;
    },
  },
});

export const { updateActivity, showWarning, logoutSession } =
  sessionSlice.actions;

export default sessionSlice.reducer;
