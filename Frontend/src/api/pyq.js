import API from "./axios";

export const getAllPyqs = async (params) => {
  const response = await API.get("/", { params });
  return response.data.data;
};

export const getPyqById = async (id) => {
  const response = await API.get(`/${id}`);
  return response.data.data;
};

export const uploadPyq = async (formData) => {
  const response = await API.post("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const getPendingPyqs = async () => {
  const response = await API.get("/pending");
  return response.data.data;
};

export const approvePyq = async (id) => {
  const response = await API.patch(`/${id}/approve`);
  return response.data.data;
};

export const deletePyq = async (id) => {
  const response = await API.delete(`/${id}`);
  return response.data;
};