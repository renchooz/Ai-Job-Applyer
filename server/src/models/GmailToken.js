import mongoose from "mongoose";

const gmailTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    email: {
      type: String
    },

    accessToken: {
      type: String
    },

    refreshToken: {
      type: String,
      required: true
    },

    scope: {
      type: String
    },

    expiryDate: {
      type: Number
    }
  },
  { timestamps: true }
);

export default mongoose.model("GmailToken", gmailTokenSchema);