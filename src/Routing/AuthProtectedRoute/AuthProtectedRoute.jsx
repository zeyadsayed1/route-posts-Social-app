import { Navigate } from "react-router";

export default function AuthProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" />;
  }

  return children;
}