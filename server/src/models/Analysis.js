import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume"
    },

    jobDescription: String,

    matchScore: Number,

    strengths: [String],

    missingSkills: [String],

    suggestions: [String]
  },
  { timestamps: true }
);

export default mongoose.model("Analysis", analysisSchema);