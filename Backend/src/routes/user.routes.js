import express from "express";
import { joinQueue, getStatus, getQueueInfo } from "../controllers/user.controller.js";

const router = express.Router();

// Join Queue
router.post("/join", joinQueue);

// Get Token Status
router.get("/status/:tokenId", getStatus);

// Get Queue Info
router.get("/queue/:queueId", getQueueInfo);

export default router;