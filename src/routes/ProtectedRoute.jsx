import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.auth); // where your OAuth/mock token is stored
  const { lastActivity } = useSelector((state) => state.session);
  const location = useLocation();

  // If no token or session expired, redirect to login
  if (!token || !lastActivity) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
