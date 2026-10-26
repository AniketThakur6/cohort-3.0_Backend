import app from "./app/app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(`connected:`, socket.id);

  socket.on("disconnect", (reason) => {
    console.log("disconnected:", socket.id, reason);
  });
});

httpServer.listen(3000, () => {
  console.log(`server is running at ${3000}`);
});
