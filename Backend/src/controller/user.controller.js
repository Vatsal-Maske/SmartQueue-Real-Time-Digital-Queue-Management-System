import Token from "../models/token.model.js";
import Queue from "../models/queue.model.js";

// Join Queue
export const joinQueue = async (req, res) => {
  try {
    const { queueId } = req.body;

    if (!queueId) {
      return res.status(400).json({ message: "Queue ID required" });
    }

    const queue = await Queue.findById(queueId);
    if (!queue) {
      return res.status(404).json({ message: "Queue not found" });
    }

    // Count tokens
    const count = await Token.countDocuments({ queueId });

    const tokenNumber = `A-${count + 1}`;

    const token = await Token.create({
      queueId,
      tokenNumber,
    });

    res.status(201).json(token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Status
export const getStatus = async (req, res) => {
  try {
    const { tokenId } = req.params;

    const token = await Token.findById(tokenId);
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    const queue = await Queue.findById(token.queueId);

    // Count position
    const position = await Token.countDocuments({
      queueId: token.queueId,
      status: "waiting",
      createdAt: { $lt: token.createdAt },
    });

    const waitTime = position * queue.avgServiceTime;

    res.json({
      tokenNumber: token.tokenNumber,
      status: token.status,
      position,
      estimatedWaitTime: waitTime,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};