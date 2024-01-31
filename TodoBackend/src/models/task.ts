import mongoose, { Document, Model } from "mongoose";
const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description:{
      type: String,
      required: true,
    },
    deadLine: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      default: 2,
      enum: [1, 2, 3], // high, medium, low
    },
    completed: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", TaskSchema);