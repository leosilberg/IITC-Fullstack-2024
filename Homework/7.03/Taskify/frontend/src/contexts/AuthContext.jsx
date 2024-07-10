import useLocalStorage from "@/hooks/useLocalStorage.jsx";
import api from "@/lib/api.js";
import { TOKEN_KEY } from "@/lib/consts.js";
import { formatJWTToken } from "@/lib/jwt.utils.js";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === null) {
    console.log(`AuthContext: Use inside AuthProvider`);
    throw "Use inside AuthProvider";
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [token, setToken] = useLocalStorage(TOKEN_KEY);
  const navigate = useNavigate();

  async function login(email, password) {
    try {
      const { data: token } = await api.post("/auth/login", {
        email,
        password,
      });
      setToken(token);
    } catch (error) {
      throw error.response?.data ? error.response.data : error.message;
    }
  }

  async function logout() {
    setToken(null);
  }

  async function register(username, email, password, firstName, lastName) {
    try {
      const { data } = await api.post("/auth/register", {
        username,
        email,
        password,
        firstName,
        lastName,
      });
      navigate("/login");
    } catch (error) {
      console.log(`AuthContext: `, error);
      throw error.response?.data ? error.response.data : error.message;
    }
  }

  useEffect(() => {
    console.log(`AuthContext: `, token);
    async function loadUser() {
      try {
        const { data: user } = await api.get("/user/details");
        setUser(user);
      } catch (error) {
        console.log(`AuthContext: `, error);
        setToken(null);
      }
    }

    let timeout;
    if (token) {
      loadUser();
      timeout = setTimeout(
        () => {
          console.log(`AuthContext: token expired`);
          setToken(null);
        },
        formatJWTToken(token).exp * 1000 - Date.now(),
      );
    } else {
      setUser(null);
    }

    return () => timeout && clearTimeout(timeout);
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
