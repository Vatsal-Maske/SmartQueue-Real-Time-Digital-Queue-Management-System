import express from "express";
import {
  createQueue,
  getQueueDetails,
  callNext,
  skipToken,
  pauseQueue,
  resumeQueue,
  getAllQueues,
} from "../controllers/admin.controller.js";

const router = express.Router();

// Create Queue
router.post("/queue", createQueue);

// Get All Queues
router.get("/queues", getAllQueues);

// Get Queue Details
router.get("/queue/:queueId", getQueueDetails);

// Call Next Token
router.post("/queue/next", callNext);

// Skip Token
router.post("/queue/skip", skipToken);

// Pause Queue
router.post("/queue/pause", pauseQueue);

// Resume Queue
router.post("/queue/resume", resumeQueue);

export default router;