import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../zustand/bearsStore";

const ProtectedRouter = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated === null) {
    return <div> Loading ...</div>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRouter;
