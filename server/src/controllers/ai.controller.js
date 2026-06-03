import Resume from "../models/Resume.js";
import Analysis from "../models/Analysis.js";

import {
  analyzeResumeWithJD
} from "../services/ai.service.js";

export const analyzeResume = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found"
      });
    }

    const aiResult = await analyzeResumeWithJD(
      resume.extractedText,
      jobDescription
    );

    const analysis = await Analysis.create({
      user: req.user._id,
      resume: resume._id,
      jobDescription,
      ...aiResult
    });

    res.status(200).json({
      success: true,
      analysis
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};