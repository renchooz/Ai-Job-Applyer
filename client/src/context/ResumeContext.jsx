import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import toast from "react-hot-toast";

import {
  uploadResumeApi,
  getMyResumesApi,
  getResumePreviewApi,
  renameResumeApi,
  deleteResumeApi
} from "../api/resumeApi";

const ResumeContext = createContext(null);

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState([]);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);

  const fetchResumes = async () => {
    try {
      setResumeLoading(true);
      const { data } = await getMyResumesApi();
      setResumes(data.resumes || []);
      return data.resumes;
    } catch (error) {
      toast.error(error.message || "Failed to fetch resumes");
      return [];
    } finally {
      setResumeLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const uploadResume = async (file) => {
    try {
      if (!file) {
        toast.error("Please select a resume PDF");
        return null;
      }

      if (file.type !== "application/pdf") {
        toast.error("Only PDF files are allowed");
        return null;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Resume size must be less than 5MB");
        return null;
      }

      setResumeLoading(true);

      const { data } = await uploadResumeApi(file);

      await fetchResumes();

      toast.success("Resume uploaded successfully");

      return data.resume;
    } catch (error) {
      toast.error(error.message || "Resume upload failed");
      return null;
    } finally {
      setResumeLoading(false);
    }
  };

  const previewResume = async (resumeId) => {
    try {
      const { data } = await getResumePreviewApi(resumeId);

      if (data.previewUrl) {
        window.open(data.previewUrl, "_blank");
      }

      return data.previewUrl;
    } catch (error) {
      toast.error(error.message || "Preview failed");
      return null;
    }
  };

  const renameResume = async (resumeId, newName) => {
    try {
      if (!newName?.trim()) {
        toast.error("Resume name is required");
        return null;
      }

      const { data } = await renameResumeApi(
        resumeId,
        newName.trim()
      );

      setResumes((prev) =>
        prev.map((resume) =>
          resume._id === resumeId ? data.resume : resume
        )
      );

      toast.success("Resume renamed successfully");

      return data.resume;
    } catch (error) {
      toast.error(error.message || "Rename failed");
      return null;
    }
  };

  const deleteResume = async (resumeId) => {
  try {
    await deleteResumeApi(resumeId);

    setResumes((prev) =>
      prev.filter((resume) => resume._id !== resumeId)
    );

    if (selectedResume?._id === resumeId) {
      setSelectedResume(null);
    }

    toast.success("Resume deleted successfully");

    return true;
  } catch (error) {
    toast.error(error.message || "Delete failed");
    return false;
  }
};

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        resumeLoading,
        selectedResume,
        setSelectedResume,
        fetchResumes,
        uploadResume,
        previewResume,
        renameResume,
        deleteResume
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);