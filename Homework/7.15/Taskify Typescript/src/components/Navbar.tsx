import { useAuthContext } from "@/contexts/AuthContext.jsx";
import { cn } from "@/lib/utils.js";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu.jsx";

function TextNavLink({ to, className, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          isActive ? "text-foreground" : "text-muted-foreground",
          "hover:text-foreground",
          className,
        )
      }
    >
      {children}
    </NavLink>
  );
}
export default function Navbar() {
  const { user, logout } = useAuthContext();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-opacity-30 px-4 backdrop-blur-md backdrop-filter md:px-16">
      <nav className="flex w-full items-center gap-4 text-sm font-medium">
        <TextNavLink to="/">Home</TextNavLink>
        {user ? (
          <>
            <TextNavLink to="/tasks">My Tasks</TextNavLink>
            <TextNavLink to="/contact">Contact</TextNavLink>
            <TextNavLink to="/about">About</TextNavLink>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="ms-auto cursor-pointer">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    {user.firstName[0] + user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <div className="ms-auto flex gap-4">
              <TextNavLink to="/auth/login">Login</TextNavLink>
              <TextNavLink to="/auth/signup">Sign Up</TextNavLink>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
