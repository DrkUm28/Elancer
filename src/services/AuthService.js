import axios from "axios";
import { API_URL } from "../constants";
import { getUser } from "./usersApi";
class AuthService {
  async login(email, password) {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    if (response.data.token) {
      const userData = {
        id: response.data.user.id,
        role: response.data.user.user_role,
        token: response.data.token,
      };
      localStorage.setItem("user", JSON.stringify(userData));
    }
    return response.data;
  }

  async register(first_name, last_name, email, password, user_role) {
    const response = await axios.post(`${API_URL}/auth/register`, {
      first_name,
      last_name,
      email,
      password,
      user_role,
    });
    if (response.data.token) {
      const userData = {
        id: response.data.user.id,
        role: response.data.user.user_role,
        token: response.data.token,
      };
      localStorage.setItem("user", JSON.stringify(userData));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  async getCurrentUser() {
    const userData = JSON.parse(localStorage.getItem("user"));
    let user = {};
    if (userData?.id) {
      user = await getUser(userData.id);
    }

    return user;
  }

  getIsLoggedIn() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
