import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

import {
  analyzeResumeApi,
  generateEmailApi,
  generateCoverLetterApi,
  selectBestResumeApi,
  oneClickApplyApi,
  previewApplicationApi,
} from "../api/aiApi";

const AIContext = createContext(null);

export const AIProvider = ({ children }) => {
  const [aiLoading, setAiLoading] = useState(false);

  const [analysisResult, setAnalysisResult] = useState(null);
  const [generatedEmail, setGeneratedEmail] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [bestResume, setBestResume] = useState(null);
  const [applicationResult, setApplicationResult] = useState(null);
  const [applicationPreview, setApplicationPreview] = useState(null);

  const analyzeResume = async ({ resumeId, jobDescription }) => {
    try {
      if (!resumeId || !jobDescription?.trim()) {
        toast.error("Resume and job description are required");
        return null;
      }

      setAiLoading(true);

      const { data } = await analyzeResumeApi({
        resumeId,
        jobDescription,
      });

      setAnalysisResult(data.analysis);
      toast.success("Resume analyzed successfully");

      return data.analysis;
    } catch (error) {
      toast.error(error.message || "Analysis failed");
      return null;
    } finally {
      setAiLoading(false);
    }
  };

  const generateEmail = async ({ resumeId, jobDescription, companyName }) => {
    try {
      if (!resumeId || !jobDescription?.trim()) {
        toast.error("Resume and job description are required");
        return null;
      }

      setAiLoading(true);

      const { data } = await generateEmailApi({
        resumeId,
        jobDescription,
        companyName,
      });

      setGeneratedEmail(data.email);
      toast.success("Email generated successfully");

      return data.email;
    } catch (error) {
      toast.error(error.message || "Email generation failed");
      return null;
    } finally {
      setAiLoading(false);
    }
  };

  const generateCoverLetter = async ({
    resumeId,
    jobDescription,
    companyName,
  }) => {
    try {
      if (!resumeId || !jobDescription?.trim()) {
        toast.error("Resume and job description are required");
        return null;
      }

      setAiLoading(true);

      const { data } = await generateCoverLetterApi({
        resumeId,
        jobDescription,
        companyName,
      });

      setCoverLetter(data.coverLetter);
      toast.success("Cover letter generated successfully");

      return data.coverLetter;
    } catch (error) {
      toast.error(error.message || "Cover letter generation failed");
      return null;
    } finally {
      setAiLoading(false);
    }
  };

  const selectBestResume = async ({ jobDescription }) => {
    try {
      if (!jobDescription?.trim()) {
        toast.error("Job description is required");
        return null;
      }

      setAiLoading(true);

      const { data } = await selectBestResumeApi({
        jobDescription,
      });

      setBestResume(data.bestResume);
      toast.success("Best resume selected");

      return data.bestResume;
    } catch (error) {
      toast.error(error.message || "Best resume selection failed");
      return null;
    } finally {
      setAiLoading(false);
    }
  };

  const oneClickApply = async ({ to, companyName, jobDescription }) => {
    try {
      if (!to || !companyName || !jobDescription?.trim()) {
        toast.error("HR email, company name and job description are required");
        return null;
      }

      setAiLoading(true);

      const { data } = await oneClickApplyApi({
        to,
        companyName,
        jobDescription,
      });

      setApplicationResult(data.application);
      toast.success("Application sent successfully");

      return data.application;
    } catch (error) {
      toast.error(error.message || "Application failed");
      return null;
    } finally {
      setAiLoading(false);
    }
  };
  const previewApplication = async ({ to, companyName, jobDescription }) => {
    try {
      if (!to || !companyName || !jobDescription?.trim()) {
        toast.error("HR email, company name and job description are required");
        return null;
      }

      setAiLoading(true);

      const { data } = await previewApplicationApi({
        to,
        companyName,
        jobDescription,
      });

      setApplicationPreview(data.preview);
      toast.success("Application preview generated");

      return data.preview;
    } catch (error) {
      toast.error(error.message || "Preview generation failed");
      return null;
    } finally {
      setAiLoading(false);
    }
  };

  const clearAIResults = () => {
    setAnalysisResult(null);
    setGeneratedEmail(null);
    setCoverLetter(null);
    setBestResume(null);
    setApplicationResult(null);
  };

  return (
    <AIContext.Provider
      value={{
        aiLoading,
        analysisResult,
        generatedEmail,
        coverLetter,
        bestResume,
        applicationResult,
        analyzeResume,
        generateEmail,
        generateCoverLetter,
        selectBestResume,
        oneClickApply,
        clearAIResults,
        applicationPreview,
        previewApplication,
        setApplicationPreview,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => useContext(AIContext);
