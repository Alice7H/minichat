import { NextApiResponseWithSocket } from '../../types/next';
import messageHandler from '../../utils/sockets/messageHandler';
import { NextApiRequest } from 'next'
import { Server, Socket } from "socket.io"

export default function SocketHandler ( _: NextApiRequest, res: NextApiResponseWithSocket ) {
  if (res.socket.server.io) {
    console.log('Socket is already running')
    res.end()
    return
  }

  console.log('Socket is starting')
  const io = new Server (res.socket.server)
  res.socket.server.io = io

  const onConnection = (socket: Socket) => {
    messageHandler(io, socket)
  }

  // io.emit('hello', 'mensagem de conexão do servidor para o cliente')
  io.on("connection", onConnection)

  res.end()
}