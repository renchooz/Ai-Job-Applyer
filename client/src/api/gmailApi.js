import api from "./axios";

export const getGmailAuthUrlApi = () => {
  return api.get("/gmail/auth");
};

export const getGmailStatusApi = () => {
  return api.get("/gmail/status");
};