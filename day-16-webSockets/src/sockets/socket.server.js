import { Server } from "socket.io";

const initializeSocket = (httpServer) => {
  const io = new Server(httpServer);
};

export default initializeSocket;
