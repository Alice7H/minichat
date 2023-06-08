// import { Server as NetServer, Socket } from "node:net";
// import { NextApiResponse } from "next";
// import { Server } from "socket.io";
// export type NextApiResponseServerIO = NextApiResponse & {
//   socket: Socket & {
//     server: NetServer & {
//       io: Server;
//     };
//   };
// };

import type { Server as HTTPServer } from 'http'
import type { NextApiResponse } from 'next'
import type { Socket as NetSocket } from 'node:net'
import type { Server as IOServer } from 'socket.io'

export interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

export interface SocketWithIO extends NetSocket {
  server: SocketServer
}

export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}