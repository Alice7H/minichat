import { Server, Socket } from "socket.io"

let count = 0

// eslint-disable-next-line import/no-anonymous-default-export
export default(io: Server, socket: Socket) => {
  console.log('connection has been established', ++count)
  const createdMessage = (obj: any) => {
    io.emit("receive-message", obj)
  }
  socket.on("send-message", createdMessage)
}