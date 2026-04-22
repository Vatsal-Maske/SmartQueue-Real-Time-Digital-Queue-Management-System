import Queue from "../models/queue.model.js";

// Create new queue
export const createQueue = async (name, avgServiceTime = 5) => {
  const queue = await Queue.create({
    name,
    avgServiceTime,
    isActive: true,
  });
  return queue;
};

// Get queue by ID
export const getQueueById = async (queueId) => {
  return await Queue.findById(queueId);
};

// Get all queues
export const getAllQueues = async () => {
  return await Queue.find();
};

// Update queue
export const updateQueue = async (queueId, updates) => {
  return await Queue.findByIdAndUpdate(queueId, updates, { new: true });
};

// Pause queue
export const pauseQueue = async (queueId) => {
  return await Queue.findByIdAndUpdate(
    queueId,
    { isActive: false },
    { new: true }
  );
};

// Resume queue
export const resumeQueue = async (queueId) => {
  return await Queue.findByIdAndUpdate(
    queueId,
    { isActive: true },
    { new: true }
  );
};

// Delete queue
export const deleteQueue = async (queueId) => {
  return await Queue.findByIdAndDelete(queueId);
};