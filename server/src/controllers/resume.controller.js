import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

import Resume from "../models/Resume.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required",
      });
    }

    const pdfBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdf(pdfBuffer);

    const extractedText = pdfData.text?.trim();

    if (!extractedText) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from PDF",
      });
    }

    const resume = await Resume.create({
      user: req.user._id,
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      extractedText,
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: {
        id: resume._id,
        originalName: resume.originalName,
        fileName: resume.fileName,
        fileSize: resume.fileSize,
        extractedTextPreview: resume.extractedText.slice(0, 500),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id })
      .select("-extractedText")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
