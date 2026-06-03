import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "models/gemini-2.5-flash",
});

const result = await model.generateContent("Reply only with: Hello Raj");

console.log(result.response.text());
console.log(process.env.GEMINI_API_KEY);
