import { NavLink } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext.jsx";
import { cn } from "../utils/tailwind.utils.js";

function TextNavLink({ href, className, children }) {
  return (
    <NavLink
      to={href}
      style={({ isActive }) => ({
        color: isActive ? "darkblue" : "white",
      })}
      className={className}
    >
      {children}
    </NavLink>
  );
}
export default function Navbar() {
  const { user } = useUserContext();

  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-violet-600 px-16 py-2 text-white">
      <ul className="flex gap-4">
        <TextNavLink href={"/"}>Home</TextNavLink>
        <TextNavLink href={"/products"}>Products</TextNavLink>
        <TextNavLink href={"/user/create"}>Create</TextNavLink>
      </ul>
      {user ? (
        <TextNavLink
          className="rounded-lg bg-blue-600 px-8 py-2"
          href={"/user"}
        >
          {user.firstName}
        </TextNavLink>
      ) : (
        <TextNavLink
          className="rounded-lg bg-blue-600 px-8 py-2"
          href={"/login"}
        >
          Login
        </TextNavLink>
      )}
    </div>
  );
}
