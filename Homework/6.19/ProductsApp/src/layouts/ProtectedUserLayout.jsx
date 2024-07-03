import { useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext.jsx";

export default function ProtectedUserLayout() {
  const { user } = useUserContext();
  return <>{user === null ? <Navigate to="/login" /> : <Outlet />}</>;
}
