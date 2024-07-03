import { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "../services/auth.service.js";
import { formatJWTTokenToUser } from "../utils/jwt.utils.js";
import { UserService } from "../services/user.service.js";
import { useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../Consts.js";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState();
  async function loadUser() {
    try {
      const {
        data: { user },
      } = await UserService.getUser();
      setUser(user);
      console.log(`UserContext: `, user);
    } catch (error) {
      console.log(`UserContext: `, error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    let timeout;
    if (token) {
      const {
        payload: { exp },
      } = formatJWTTokenToUser(token);
      const timeUntilExpiration = exp * 1000 - Date.now();

      timeout = setTimeout(
        () => {
          setUser(null);
          localStorage.removeItem(TOKEN_KEY);
          console.log(`UserContext: auth token expired`);
        },
        timeUntilExpiration > 0 ? timeUntilExpiration : 0,
      );
    }

    return () => timeout && clearTimeout(timeout);
  }, [user]);

  useEffect(() => {
    loadUser();
  }, []);

  async function login(username, password) {
    try {
      const message = await AuthService.login(username, password);
      console.log(`UserContext: `, message);
      await loadUser();
      return true;
    } catch (error) {
      console.log(`UserContext: `, error);
    }
  }

  async function logout() {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (context === null) {
    console.log(`UserContext: use inside UserProvider`);
  }
  return context;
}
