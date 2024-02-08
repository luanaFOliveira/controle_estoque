import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../../context/AuthProvider';

export default function GuestLayout() {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
