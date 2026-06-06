import api from "./axios";

export const getEmailHistoryApi = () => {
  return api.get("/email/history");
};

export const sendEmailApi = (payload) => {
  return api.post("/email/send", payload);
};