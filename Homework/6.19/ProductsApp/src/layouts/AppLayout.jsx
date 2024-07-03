import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
}
