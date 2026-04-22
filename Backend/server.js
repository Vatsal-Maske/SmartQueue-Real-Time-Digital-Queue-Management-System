import app from "./src/app.js";
import { initSocket } from "./src/sockets/socketHandler.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Initialize Socket.io
initSocket(server);