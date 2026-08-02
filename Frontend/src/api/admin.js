import API from "./axios";

export const getDashboard = async () => {
  const response = await API.get("/admin/dashboard");
  return response.data.data;
};

export const getPendingResources = async () => {
  const response = await API.get("/admin/resources/pending");
  return response.data.data;
};

export const approveResource = async (id) => {
  const response = await API.patch(`/admin/resources/${id}/approve`);
  return response.data.data;
};

export const deleteResource = async (id) => {
  await API.delete(`/admin/resources/${id}`);
};

export const getPendingPyqs = async () => {
  const response = await API.get("/admin/pyqs/pending");
  return response.data.data;
};

export const approvePyq = async (id) => {
  const response = await API.patch(`/admin/pyqs/${id}/approve`);
  return response.data.data;
};

export const deletePyq = async (id) => {
  await API.delete(`/admin/pyqs/${id}`);
};

export const getAllResumes = async () => {
  const response = await API.get("/admin/resumes");
  return response.data.data;
};