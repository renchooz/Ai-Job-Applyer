export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePDF = (file) => {
  return file?.type === "application/pdf";
};

export const validateFileSize = (file) => {
  return file?.size <= 5 * 1024 * 1024;
};