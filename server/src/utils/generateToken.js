import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export default generateToken;