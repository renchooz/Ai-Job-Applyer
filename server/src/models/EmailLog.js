import mongoose from "mongoose";

const emailLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume"
    },

    from: String,
    to: String,
    subject: String,
    body: String,

    status: {
      type: String,
      enum: ["sent", "failed"],
      default: "sent"
    },

    messageId: String,

    error: String
  },
  { timestamps: true }
);

export default mongoose.model("EmailLog", emailLogSchema);