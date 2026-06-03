import { GoogleGenerativeAI } from "@google/generative-ai";

let model;

const getModel = () => {
  if (!model) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
  }

  return model;
};

export const analyzeResumeWithJD = async (resumeText, jobDescription) => {
  const prompt = `
Analyze the resume against the job description.

Return ONLY valid JSON.

{
  "matchScore": number,
  "strengths": [],
  "missingSkills": [],
  "suggestions": []
}

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}
`;

  const result = await getModel().generateContent(prompt);

  const response = result.response.text();

  return JSON.parse(response.replace(/```json|```/g, "").trim());
};
