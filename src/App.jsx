import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import TransactionPage from "./pages/TransactionPage";
import TransfersPage from "./pages/TransfersPage";
import Login from "./pages/Login";
import AppLayout from "./components/layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import {
  logoutSession,
  showWarning,
  updateActivity,
} from "./features/session/sessionSlice";

export default function App() {
  const dispatch = useDispatch();
  const { lastActivity, warning } = useSelector((state) => state.session);

  // 🔹 Global activity listener
  useEffect(() => {
    const resetActivity = () => dispatch(updateActivity());

    window.addEventListener("mousemove", resetActivity);
    window.addEventListener("keydown", resetActivity);
    window.addEventListener("click", resetActivity);

    return () => {
      window.removeEventListener("mousemove", resetActivity);
      window.removeEventListener("keydown", resetActivity);
      window.removeEventListener("click", resetActivity);
    };
  }, [dispatch]);

  // 🔹 Session timeout + warning modal
  useEffect(() => {
    if (!lastActivity) return;

    const warningTime = 4 * 60 * 1000; // 4 minutes
    const logoutTime = 5 * 60 * 1000; // 5 minutes

    const now = Date.now();
    const timeSinceActivity = now - lastActivity;

    const warningTimeout = setTimeout(() => {
      dispatch(showWarning());
    }, Math.max(warningTime - timeSinceActivity, 0));

    const logoutTimeout = setTimeout(() => {
      dispatch(logoutSession());
      window.location.href = "/login"; // redirect
    }, Math.max(logoutTime - timeSinceActivity, 0));

    return () => {
      clearTimeout(warningTimeout);
      clearTimeout(logoutTimeout);
    };
  }, [lastActivity, dispatch]);

  return (
    <AppLayout>
      {warning && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-lg font-bold mb-2">Session Expiring</h2>
            <p className="mb-4">
              You will be logged out due to inactivity in 1 minute.
            </p>
            <button
              onClick={() => dispatch(updateActivity())}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Stay Logged In
            </button>
          </div>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accounts/:id/transactions"
          element={
            <ProtectedRoute>
              <TransactionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transfers/:accountId?"
          element={
            <ProtectedRoute>
              <TransfersPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppLayout>
  );
}
