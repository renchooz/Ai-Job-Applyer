import Resume from "../models/Resume.js";
import EmailLog from "../models/EmailLog.js";

import {
  selectBestResume,
  generateJobEmail
} from "../services/ai.service.js";

import {
  sendGmailWithAttachment
} from "../services/email.service.js";

export const oneClickApply = async (req, res) => {
  try {
    const {
      to,
      companyName,
      jobDescription
    } = req.body;

    if (!to || !companyName || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "to, companyName and jobDescription are required"
      });
    }

    const resumes = await Resume.find({
      user: req.user._id
    });

    if (!resumes.length) {
      return res.status(404).json({
        success: false,
        message: "No resumes found"
      });
    }

    const bestResumeResult = await selectBestResume(
      resumes,
      jobDescription
    );

    const selectedResume = await Resume.findOne({
      _id: bestResumeResult.resumeId,
      user: req.user._id
    });

    if (!selectedResume) {
      return res.status(404).json({
        success: false,
        message: "Selected resume not found"
      });
    }

    const generatedEmail = await generateJobEmail(
      selectedResume.extractedText,
      jobDescription,
      companyName
    );

    const sentResult = await sendGmailWithAttachment({
      userId: req.user._id,
      to,
      subject: generatedEmail.subject,
      body: generatedEmail.emailBody,
      resume: selectedResume
    });

    const log = await EmailLog.create({
      user: req.user._id,
      resume: selectedResume._id,
      from: sentResult.from,
      to,
      subject: generatedEmail.subject,
      body: generatedEmail.emailBody,
      status: "sent",
      messageId: sentResult.messageId
    });

    res.status(200).json({
      success: true,
      message: "Application sent successfully",
      application: {
        companyName,
        to,
        selectedResume: {
          id: selectedResume._id,
          name: selectedResume.originalName,
          matchScore: bestResumeResult.matchScore,
          reason: bestResumeResult.reason
        },
        email: {
          subject: generatedEmail.subject,
          body: generatedEmail.emailBody
        },
        sent: {
          from: sentResult.from,
          messageId: sentResult.messageId
        },
        logId: log._id
      }
    });

  } catch (error) {
    await EmailLog.create({
      user: req.user?._id,
      to: req.body?.to,
      subject: "One Click Apply Failed",
      body: req.body?.jobDescription,
      status: "failed",
      error: error.message
    }).catch(() => {});

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};