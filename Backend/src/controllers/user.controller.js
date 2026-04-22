import * as tokenService from "../services/token.service.js";
import * as queueService from "../services/queue.service.js";

// Join Queue
export const joinQueue = async (req, res) => {
  try {
    const { queueId } = req.body;

    if (!queueId) {
      return res.status(400).json({ message: "Queue ID required" });
    }

    const queue = await queueService.getQueueById(queueId);
    if (!queue) {
      return res.status(404).json({ message: "Queue not found" });
    }

    if (!queue.isActive) {
      return res.status(400).json({ message: "Queue is paused" });
    }

    const token = await tokenService.createToken(queueId);
    res.status(201).json(token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Token Status
export const getStatus = async (req, res) => {
  try {
    const { tokenId } = req.params;

    const token = await tokenService.getTokenById(tokenId);
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    const queue = await queueService.getQueueById(token.queueId);
    const position = await tokenService.calculatePosition(token);
    const waitTime = await tokenService.calculateWaitTime(token);

    res.json({
      tokenNumber: token.tokenNumber,
      status: token.status,
      position,
      estimatedWaitTime: waitTime,
      queueName: queue?.name,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Queue Info (for users to see queue status)
export const getQueueInfo = async (req, res) => {
  try {
    const { queueId } = req.params;

    const queue = await queueService.getQueueById(queueId);
    if (!queue) {
      return res.status(404).json({ message: "Queue not found" });
    }

    const waitingTokens = await tokenService.getWaitingTokens(queueId);
    const servingToken = await tokenService.getCurrentServingToken(queueId);

    res.json({
      name: queue.name,
      isActive: queue.isActive,
      avgServiceTime: queue.avgServiceTime,
      waitingCount: waitingTokens.length,
      currentToken: servingToken?.tokenNumber || null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};