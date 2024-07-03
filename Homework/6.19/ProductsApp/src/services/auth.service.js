import axios from "axios";
import { TOKEN_KEY } from "../Consts.js";
const AUTH_URL = "http://localhost:3000/api/auth/";

async function login(username, password) {
  try {
    const { data } = await axios.post(AUTH_URL + "login", {
      username,
      password,
    });
    localStorage.setItem(TOKEN_KEY, data.token);
    return { severity: "success", message: "User login success" };
  } catch (error) {
    console.log(`auth.service: `, error);
    throw { ...error.response.data };
  }
}

async function register(username, password, firstName, lastName) {
  try {
    const { data } = await axios.post(AUTH_URL + "register", {
      username,
      password,
      firstName,
      lastName,
    });
    return { severity: "success", message: "User register success" };
  } catch (error) {
    console.log(`auth.service: `, error);
    throw { ...error.response.data };
  }
}
export const AuthService = {
  login,
  register,
};
