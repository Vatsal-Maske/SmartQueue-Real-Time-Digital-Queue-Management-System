import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    queueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Queue",
      required: true,
    },
    tokenNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["waiting", "serving", "completed"],
      default: "waiting",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Token", tokenSchema);