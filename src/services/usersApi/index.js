import { callApi } from "../DataService";

export const getUsers = () => callApi("get", "users").then((res) => res.data);

export const getUser = (id) =>
  callApi("get", `users/${id}`).then((res) => res.data);

export const addUser = (newUser) =>
  callApi("post", "users", newUser).then((res) => res.data);

export const updateUser = (updatedUser) => {
  callApi("patch", `users/${updatedUser.id}`, updatedUser).then((res) => {
    return res.data;
  });
};

export const deleteUser = (id) =>
  callApi("delete", `users/${id}`).then((res) => res.status);

export const getProfile = (id) =>
  callApi("get", `users/${id}/profile`).then((res) => res.data);

export const getApplications = (id) =>
  callApi("get", `users/${id}/applications`).then((res) => res.data);

export const updateProfilePic = (id, avatar) =>
  callApi("patch", `users/${id}`, avatar).then((res) => {
    return res.data;
  });
