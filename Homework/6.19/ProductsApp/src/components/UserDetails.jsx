import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext.jsx";

export default function UserDetails() {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  async function handleLogout() {
    await logout();
    navigate("login");
  }
  return (
    <>
      {user && (
        <div className="flex flex-col items-start gap-4 rounded-lg p-8 shadow-lg">
          <p className="text-2xl">First Name: {user.firstName}</p>
          <p className="text-2xl"> Last Name: {user.lastName}</p>
          <button
            className="rounded-lg bg-red-500 px-8 py-2 text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
