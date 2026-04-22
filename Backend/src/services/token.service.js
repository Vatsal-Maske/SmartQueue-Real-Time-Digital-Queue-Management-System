import Token from "../models/token.model.js";
import Queue from "../models/queue.model.js";

// Generate token number
export const generateTokenNumber = async (queueId) => {
  const count = await Token.countDocuments({ queueId });
  return `A-${count + 1}`;
};

// Create new token
export const createToken = async (queueId) => {
  const tokenNumber = await generateTokenNumber(queueId);
  const token = await Token.create({ queueId, tokenNumber });
  return token;
};

// Get token by ID
export const getTokenById = async (tokenId) => {
  return await Token.findById(tokenId);
};

// Get queue by ID
export const getQueueById = async (queueId) => {
  return await Queue.findById(queueId);
};

// Calculate position in queue
export const calculatePosition = async (token) => {
  return await Token.countDocuments({
    queueId: token.queueId,
    status: "waiting",
    createdAt: { $lt: token.createdAt },
  });
};

// Calculate estimated wait time
export const calculateWaitTime = async (token) => {
  const queue = await Queue.findById(token.queueId);
  const position = await calculatePosition(token);
  return position * (queue?.avgServiceTime || 5);
};

// Get current serving token
export const getCurrentServingToken = async (queueId) => {
  return await Token.findOne({ queueId, status: "serving" });
};

// Get all waiting tokens
export const getWaitingTokens = async (queueId) => {
  return await Token.find({ queueId, status: "waiting" }).sort({ createdAt: 1 });
};

// Complete current serving token
export const completeServingToken = async (queueId) => {
  return await Token.findOneAndUpdate(
    { queueId, status: "serving" },
    { status: "completed" },
    { new: true }
  );
};

// Move next waiting token to serving
export const moveNextToServing = async (queueId) => {
  return await Token.findOneAndUpdate(
    { queueId, status: "waiting" },
    { status: "serving" },
    { sort: { createdAt: 1 }, new: true }
  );
};

// Skip current token
export const skipToken = async (queueId) => {
  const currentToken = await getCurrentServingToken(queueId);
  if (!currentToken) return null;
  
  return await Token.findByIdAndUpdate(
    currentToken._id,
    { status: "skipped" },
    { new: true }
  );
};