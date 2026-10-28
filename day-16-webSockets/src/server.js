import app from "./app/app.js";
import { createServer } from "http";
import initializeSocket from "./sockets/socket.server.js";

const httpServer = createServer(app);

initializeSocket(httpServer);

const port = 3000;

httpServer.listen(port, () => {
  console.log(`server is running at ${port}`);
});
