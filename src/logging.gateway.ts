import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class LoggingGateway {
  @WebSocketServer()
  server: Server;

  logMessage(message: string) {
    if (this.server) {
      this.server.emit('log', message);
    } else {
      console.error('WebSocket server is not initialized');
    }
  }
} 