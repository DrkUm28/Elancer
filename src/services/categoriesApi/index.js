import { callApi } from "../DataService";

export const getCategoryJobs = (id) =>
  callApi("get", `categories/${id}/jobs`).then((res) => res.data);

export const getCategories = () =>
  callApi("get", "categories").then((res) => res.data);

export const getCategory = (id) =>
  callApi("get", `categories/${id}`).then((res) => res.data);

export const addCategory = (newCategory) =>
  callApi("post", "categories", newCategory).then((res) => res.data);

export const updateCategory = (updatedCategory) =>
  callApi("patch", `categories/${updatedCategory.id}`, updatedCategory).then(
    (res) => {
      return res.data;
    }
  );

export const deleteCategory = (id) =>
  callApi("delete", `categories/${id}`).then((res) => res.status);
