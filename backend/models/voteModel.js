// server/models/voteModel.js
import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    choice: { type: String, enum: ["A", "B", "C"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Vote", voteSchema);
