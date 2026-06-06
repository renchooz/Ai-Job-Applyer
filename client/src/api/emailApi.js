import api from "./axios";

export const getEmailHistoryApi = () => {
  return api.get("/email/history");
};