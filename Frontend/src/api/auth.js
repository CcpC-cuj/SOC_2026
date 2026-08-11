import API from "./axios";

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

export const sendRegistrationOtp = (data) => {
  return API.post("/auth/send-registration-otp", data);
};

export const verifyRegistrationOtp = (data) => {
  return API.post("/auth/verify-registration-otp", data);
};