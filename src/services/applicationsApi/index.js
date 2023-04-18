import { callApi } from "../DataService";

export const getApplications = () =>
  callApi("get", "applications").then((res) => res.data);

export const getApplication = (id) =>
  callApi("get", `applications/${id}`).then((res) => res.data);

export const addApplication = (newApplication) =>
  callApi("post", "applications", newApplication).then((res) => res.data);

export const updateApplication = (updatedApplication) =>
  callApi(
    "patch",
    `applications/${updatedApplication.id}`,
    updatedApplication
  ).then((res) => {
    return res.data;
  });

export const deleteApplication = (id) =>
  callApi("delete", `applications/${id}`).then((res) => res.status);
