import useLocalStorage from "@/hooks/useLocalStorage.jsx";
import api from "@/lib/api.js";
import { TOKEN_KEY } from "@/lib/consts.js";
import { formatJWTToken } from "@/lib/jwt.utils.js";
import { isAxiosError } from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

type UserState = User | null | undefined;

interface AuthContextType {
  user: UserState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === null) {
    console.log(`AuthContext: Use inside AuthProvider`);
    throw "Use inside AuthProvider";
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserState>(undefined);
  const [token, setToken] = useLocalStorage(TOKEN_KEY);
  const navigate = useNavigate();

  async function login(email: string, password: string) {
    try {
      const { data: token } = await api.post("/auth/login", {
        email,
        password,
      });
      setToken(token);
    } catch (error) {
      console.log(`AuthContext: `, error);
      if (isAxiosError(error))
        throw error.response?.data ? error.response.data : error.message;
      else throw (error as Error).message;
    }
  }

  async function logout() {
    setToken(null);
  }

  async function register(
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
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
      if (isAxiosError(error))
        throw error.response?.data ? error.response.data : error.message;
      else throw (error as Error).message;
    }
  }

  useEffect(() => {
    console.log(`AuthContext: `, token);
    async function loadUser() {
      try {
        const { data: user } = await api.get<User>("/user/details");
        setUser(user);
      } catch (error) {
        console.log(`AuthContext: `, error);
        setToken(null);
      }
    }

    let timeout: NodeJS.Timeout;
    if (token) {
      loadUser();
      timeout = setTimeout(() => {
        console.log(`AuthContext: token expired`);
        setToken(null);
      }, formatJWTToken(token)?.exp * 1000 - Date.now());
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
