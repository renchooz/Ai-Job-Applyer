import toast from "react-hot-toast";

export const handleError = (error) => {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong";

  toast.error(message);

  return message;
};