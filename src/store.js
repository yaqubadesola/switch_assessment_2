import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import accountsReducer from "./features/accounts/accountsSlice";
import profileReducer from "./features/profile/profileSlice";
import transactionsReducer from "./features/transactions/transactionsSlice";
import loaderReducer from "./features/loader/loaderSpinSlice";
import transfersReducer from "./features/transfers/transfersSlice";
import sessionReducer from "./features/session/sessionSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountsReducer,
    profile: profileReducer,
    transactions: transactionsReducer,
    loader: loaderReducer,
    session: sessionReducer,
    transfers: transfersReducer,
  },
});

export default store;
