

import API from "./axios";

// Get logged in user's profile
export const getProfile = () => {
  return API.get("/profile/me");
};

// Update profile
export const updateProfile = (data) => {
  return API.patch("/profile", data);
};

// Upload avatar
export const uploadAvatar = (formData) => {
  return API.patch("/profile/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Upload resume
export const uploadResume = (formData) => {
  return API.patch("/profile/resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};