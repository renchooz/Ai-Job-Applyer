import { google } from "googleapis";
import GmailToken from "../models/GmailToken.js";
import { createOAuthClient } from "../services/gmailOAuth.service.js";

export const connectGmail = async (req, res) => {
  try {
    const oauth2Client = createOAuthClient();

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/gmail.send",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
      state: req.user._id.toString(),
    });

    res.status(200).json({
      success: true,
      url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const gmailCallback = async (req, res) => {
  try {
    const { code, state } = req.query;

    const oauth2Client = createOAuthClient();

    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const userInfo = await oauth2.userinfo.get();

    await GmailToken.findOneAndUpdate(
      { user: state },
      {
        user: state,
        email: userInfo.data.email,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        scope: tokens.scope,
        expiryDate: tokens.expiry_date,
      },
      {
        upsert: true,
        new: true,
      },
    );

    res.redirect(`${process.env.CLIENT_URL}/dashboard?gmail=connected`)
  } catch (error) {
    res.redirect(`${process.env.CLIENT_URL}/gmail-error`);
  }
};


export const getGmailStatus = async (req, res) => {
  try {
    const gmailToken = await GmailToken.findOne({
      user: req.user._id
    });

    if (!gmailToken) {
      return res.status(200).json({
        success: true,
        connected: false,
        email: null
      });
    }

    res.status(200).json({
      success: true,
      connected: true,
      email: gmailToken.email
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};