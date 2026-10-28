import { Server } from "socket.io";

const initializeSocket = (httpServer) => {
  const io = new Server(httpServer);

  io.on("connect", (socket) => {
    console.log("connect:", socket.id);

    socket.on("receive", (msg) => {
      console.log(msg);
      socket.emit("send", "hello this msg from server");
    });
  
    socket.on("broadcast",(msg)=>{
      console.log(msg);
      io.emit("broadcast","hello to all user from server")
    })

    socket.on("to-others",(msg)=>{
      console.log(msg);
      socket.broadcast.emit("to-others",msg)
    })

  });
};

export default initializeSocket;
