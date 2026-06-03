import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import { configDotenv } from "dotenv";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const sendTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      provider: "local"
    });

    const token = generateToken(user._id);
    sendTokenCookie(res, token);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        provider: user.provider
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = generateToken(user._id);
    sendTokenCookie(res, token);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        provider: user.provider
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required"
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const { sub, name, email, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: sub,
        avatar: picture,
        provider: "google"
      });
    }

    const token = generateToken(user._id);
    sendTokenCookie(res, token);

    res.status(200).json({
      success: true,
      message: "Google login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        provider: user.provider
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });

  res.status(200).json({
    success: true,
    message: "Logout successful"
  });
};

export const getCurrentUser = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};