import { Server } from 'socket.io';
export declare class LoggingGateway {
    server: Server;
    logMessage(message: string): void;
}
