import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      socket.emit('welcome-message', 'Bienvenido al chat');
    });
  }

  @SubscribeMessage('send-message')
  handleMessage(
    @MessageBody() payload: any ,
    @ConnectedSocket() client: Socket,
  ) {
    const { message , username } = payload;
    
    if (!message || !username) return;
    this.server.emit('new-message', {
      userId: client.id,
      username,
      message,
    });
  }
}
