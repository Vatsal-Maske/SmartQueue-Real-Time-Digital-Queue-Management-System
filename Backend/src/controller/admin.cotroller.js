import Queue from "../models/queue.model.js";
import Token from "../models/token.model.js";

// Create Queue
export const createQueue = async (req, res) => {
  try {
    const { name, avgServiceTime } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Queue name required" });
    }

    const queue = await Queue.create({
      name,
      avgServiceTime,
    });

    res.status(201).json(queue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Call Next Token
export const callNext = async (req, res) => {
  try {
    const { queueId } = req.body;

    // Complete current serving token
    await Token.findOneAndUpdate(
      { queueId, status: "serving" },
      { status: "completed" }
    );

    // Get next waiting token
    const nextToken = await Token.findOneAndUpdate(
      { queueId, status: "waiting" },
      { status: "serving" },
      { sort: { createdAt: 1 }, new: true }
    );

    if (!nextToken) {
      return res.json({ message: "No users in queue" });
    }

    res.json(nextToken);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};