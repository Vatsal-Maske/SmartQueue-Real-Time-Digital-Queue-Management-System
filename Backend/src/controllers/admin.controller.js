import * as queueService from "../services/queue.service.js";
import * as tokenService from "../services/token.service.js";

// Create Queue
export const createQueue = async (req, res) => {
  try {
    const { name, avgServiceTime } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Queue name required" });
    }

    const queue = await queueService.createQueue(name, avgServiceTime);
    res.status(201).json(queue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Queue Details
export const getQueueDetails = async (req, res) => {
  try {
    const { queueId } = req.params;
    const queue = await queueService.getQueueById(queueId);

    if (!queue) {
      return res.status(404).json({ message: "Queue not found" });
    }

    const waitingTokens = await tokenService.getWaitingTokens(queueId);
    const servingToken = await tokenService.getCurrentServingToken(queueId);

    res.json({
      queue,
      waitingCount: waitingTokens.length,
      currentToken: servingToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Call Next Token
export const callNext = async (req, res) => {
  try {
    const { queueId } = req.body;

    if (!queueId) {
      return res.status(400).json({ message: "Queue ID required" });
    }

    // Complete current serving token
    await tokenService.completeServingToken(queueId);

    // Move next waiting token to serving
    const nextToken = await tokenService.moveNextToServing(queueId);

    if (!nextToken) {
      return res.json({ message: "No users in queue" });
    }

    res.json(nextToken);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Skip Token
export const skipToken = async (req, res) => {
  try {
    const { queueId } = req.body;

    if (!queueId) {
      return res.status(400).json({ message: "Queue ID required" });
    }

    const skippedToken = await tokenService.skipToken(queueId);
    
    if (!skippedToken) {
      return res.status(404).json({ message: "No serving token to skip" });
    }

    // Move next to serving
    const nextToken = await tokenService.moveNextToServing(queueId);

    res.json({ skippedToken, nextToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Pause Queue
export const pauseQueue = async (req, res) => {
  try {
    const { queueId } = req.body;
    const queue = await queueService.pauseQueue(queueId);
    res.json(queue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Resume Queue
export const resumeQueue = async (req, res) => {
  try {
    const { queueId } = req.body;
    const queue = await queueService.resumeQueue(queueId);
    res.json(queue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Queues
export const getAllQueues = async (req, res) => {
  try {
    const queues = await queueService.getAllQueues();
    res.json(queues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};