import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  } else if (token) {
    return <Navigate to="/main" replace />;
  }

  return children;
};

export default PrivateRoute;
