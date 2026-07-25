import API from "./axios";

export const getResources = () => {
  return API.get("/resources");
};