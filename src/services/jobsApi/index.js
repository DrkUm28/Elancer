import { callApi } from "../DataService";

export const getJobs = () => callApi("get", "jobs").then((res) => res.data);

export const getJob = (id) =>
  callApi("get", `jobs/${id}`).then((res) => res.data);

export const addJob = (newJob) =>
  callApi("post", "jobs", newJob).then((res) => res.data);

export const updateJob = (updatedJob) =>
  callApi("patch", `jobs/${updatedJob.id}`, updatedJob).then((res) => {
    return res.data;
  });

export const updateJobImage = (id, image) =>
  callApi("patch", `jobs/${id}`, image).then((res) => {
    return res.data;
  });

export const deleteJob = (id) =>
  callApi("delete", `jobs/${id}`).then((res) => res.status);
