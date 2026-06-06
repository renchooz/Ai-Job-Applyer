import api from "./axios";

export const registerApi = (data) => {
  return api.post("/auth/register", data);
};

export const loginApi = (data) => {
  return api.post("/auth/login", data);
};

export const googleLoginApi = (credential) => {
  return api.post("/auth/google", { credential });
};

export const getMeApi = () => {
  return api.get("/auth/me");
};

export const logoutApi = () => {
  return api.post("/auth/logout");
};