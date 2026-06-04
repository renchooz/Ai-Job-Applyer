import Resume from "../models/Resume.js";
import EmailLog from "../models/EmailLog.js";

import {
  sendGmailWithAttachment
} from "../services/email.service.js";

export const sendEmail = async (req, res) => {
  try {
    const { to, subject, emailBody, resumeId } = req.body;

    if (!to || !subject || !emailBody || !resumeId) {
      return res.status(400).json({
        success: false,
        message: "to, subject, emailBody and resumeId are required"
      });
    }

    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user._id
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found"
      });
    }

    const result = await sendGmailWithAttachment({
      userId: req.user._id,
      to,
      subject,
      body: emailBody,
      resume
    });

    const log = await EmailLog.create({
      user: req.user._id,
      resume: resume._id,
      from: result.from,
      to,
      subject,
      body: emailBody,
      status: "sent",
      messageId: result.messageId
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      email: log
    });
  } catch (error) {
    await EmailLog.create({
      user: req.user?._id,
      to: req.body?.to,
      subject: req.body?.subject,
      body: req.body?.emailBody,
      status: "failed",
      error: error.message
    }).catch(() => {});

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getEmailHistory = async (req, res) => {
  try {
    const emails = await EmailLog.find({ user: req.user._id })
      .populate("resume", "originalName fileName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: emails.length,
      emails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};