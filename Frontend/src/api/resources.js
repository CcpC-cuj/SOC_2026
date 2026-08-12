import API from "./axios";

/**
 * Get all approved resources
 */
export const getResources = async (params = {}) => {
  const response = await API.get("/resources", {
    params,
  });

  return response.data.data;
};

/**
 * Get a single resource
 */
export const getResourceById = async (id) => {
  const response = await API.get(`/resources/${id}`);

  return response.data.data;
};

/**
 * Upload a new resource
 */
export const uploadResource = async (formData) => {
  const response = await API.post(
    "/resources",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
};

/**
 * Get all pending resources (Admin)
 */
export const getPendingResources = async () => {
  const response = await API.get("/resources/pending");

  return response.data.data;
};

/**
 * Approve a resource (Admin)
 */
export const approveResource = async (id) => {
  const response = await API.patch(`/resources/${id}/approve`);

  return response.data;
};

/**
 * Delete a resource
 */
export const deleteResource = async (id) => {
  const response = await API.delete(`/resources/${id}`);

  return response.data;
};

export const getMyRecentResources = async() =>{
  const response =  await API.get("/resources/my/recent");

  return response.data;
}

export const downloadResource = async (id) => {

    const response = await API.get(
        `/resources/${id}/download`
    );
    return response.data.data;
};