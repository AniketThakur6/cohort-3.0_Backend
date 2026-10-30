import {Server} from 'socket.io';

export default function (httpServer){
  const io = new Server(httpServer);

  io.on("connect",(socket)=>{

    console.log()

  })

}