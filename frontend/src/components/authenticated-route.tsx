import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth-store";

const AuthenticatedRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return accessToken ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthenticatedRoute;
