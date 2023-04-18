import axios from "axios";
import { API_URL } from "../constants";

export function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}

export async function callApi(method, uri, data) {
  const response = await axios({
    method: method,
    url: `${API_URL}/${uri}`,
    data: data,
    headers: authHeader(),
  });

  return response;
}
