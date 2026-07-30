import API from "./axios";

const BASE_URL = "/pyqs";

export const getAllPyqs = async (params) => {
    const { data } = await API.get(BASE_URL, { params });
    return data.data;
};

export const getPyqById = async (id) => {
    const { data } = await API.get(`${BASE_URL}/${id}`);
    return data.data;
};

export const uploadPyq = async (formData) => {
    const { data } = await API.post(BASE_URL, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data.data;
};

export const getPendingPyqs = async () => {
    const { data } = await API.get(`${BASE_URL}/pending`);
    return data.data;
};

export const approvePyq = async (id) => {
    const { data } = await API.patch(`${BASE_URL}/${id}/approve`);
    return data.data;
};

export const deletePyq = async (id) => {
    const { data } = await API.delete(`${BASE_URL}/${id}`);
    return data;
};