import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("joinQueue", (queueId) => {
      socket.join(`queue-${queueId}`);
      console.log(`Client joined queue-${queueId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

// Emit events
export const emitTokenCalled = (queueId, token) => {
  if (io) {
    io.to(`queue-${queueId}`).emit("tokenCalled", token);
  }
};

export const emitTokenJoined = (queueId, token) => {
  if (io) {
    io.to(`queue-${queueId}`).emit("tokenJoined", token);
  }
};

export const emitQueueUpdated = (queueId, data) => {
  if (io) {
    io.to(`queue-${queueId}`).emit("queueUpdated", data);
  }
};