import fs from "fs";
import path from "path";
import { google } from "googleapis";

import GmailToken from "../models/GmailToken.js";
import { createOAuthClient } from "./gmailOAuth.service.js";

const makeBody = ({
  to,
  from,
  subject,
  body,
  attachmentPath,
  attachmentName,
}) => {
  const boundary = "boundary_" + Date.now();
  const sanitizeSubject = (subject) => {
    return subject
      .replace(/–/g, "-")
      .replace(/—/g, "-")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'");
  };
  const attachment = fs.readFileSync(attachmentPath).toString("base64");
  const safeSubject = sanitizeSubject(subject);


  const messageParts = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${safeSubject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    body,
    "",
    `--${boundary}`,
    `Content-Type: application/pdf; name="${attachmentName}"`,
    "Content-Transfer-Encoding: base64",
    `Content-Disposition: attachment; filename="${attachmentName}"`,
    "",
    attachment,
    "",
    `--${boundary}--`,
  ];

  const message = messageParts.join("\n");

  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const sendGmailWithAttachment = async ({
  userId,
  to,
  subject,
  body,
  resume,
}) => {
  const gmailToken = await GmailToken.findOne({ user: userId });

  if (!gmailToken) {
    throw new Error("Gmail is not connected");
  }

  const oauth2Client = createOAuthClient();

  oauth2Client.setCredentials({
    access_token: gmailToken.accessToken,
    refresh_token: gmailToken.refreshToken,
    expiry_date: gmailToken.expiryDate,
  });

  const gmail = google.gmail({
    version: "v1",
    auth: oauth2Client,
  });

  const attachmentPath = path.resolve(resume.filePath);

  const raw = makeBody({
    to,
    from: gmailToken.email,
    subject,
    body,
    attachmentPath,
    attachmentName: resume.originalName,
  });

  const response = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw,
    },
  });

  return {
    messageId: response.data.id,
    from: gmailToken.email,
  };
};
