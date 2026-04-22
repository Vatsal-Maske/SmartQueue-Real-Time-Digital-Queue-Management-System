import mongoose from "mongoose";

const queueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avgServiceTime: {
      type: Number,
      default: 5,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Queue", queueSchema);