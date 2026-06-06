import api from "./axios";

export const uploadResumeApi = (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  return api.post("/resumes/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const getMyResumesApi = () => {
  return api.get("/resumes/my");
};

export const getResumePreviewApi = (resumeId) => {
  return api.get(`/resumes/preview/${resumeId}`);
};

export const renameResumeApi = (resumeId, newName) => {
  return api.patch(`/resumes/rename/${resumeId}`, {
    newName
  });
};

export const deleteResumeApi = (resumeId) => {
  return api.delete(`/resumes/${resumeId}`);
};