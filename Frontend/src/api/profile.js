import API from "./axios";

export const getProfile = () => {
  return API.get("/profile/me");
};