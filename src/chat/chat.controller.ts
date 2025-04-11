// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Put,
//   Param,
//   Delete,
//   Query,
//   Res,
//   UnauthorizedException,
// } from '@nestjs/common';

// import { ChatService } from './chat.service';
// import { CreateChatDto, CreateMessageDto } from './dto/create-chat.dto';
// import { UpdateChatDto } from './dto/update-chat.dto';
// import { GetChatsDto, GetChatMessagesDto } from './dto/get-chat.dto';
// import { ParseObjectIdPipe } from 'src/common/parseObjectIdPipe';

// import { CurrentUser } from 'src/decorators/current-user.decorators';

// import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
// import { WebsocketGateway } from 'src/websocket/websocket.gateway';
// import { NotificationService } from 'src/notification/notification.service';
// import { NotificationTypeEnum } from 'src/notification/entities/notification.entity';

// @Controller('chats')
// // @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
// export class ChatController {
//   constructor(
//     private readonly chatService: ChatService,
//     private readonly notificationService: NotificationService,
//     private readonly webSocketServices: WebsocketGateway,
//   ) {}

//   @Post()
//   createChat(@Body() CreateChatDto: CreateChatDto, @Res() response: Response) {
//     // return this.ChatService.create(CreateChatDto, response);
//   }

//   // @ApiQuery({ name: 'search', required: false, description: 'Search term' })
//   @ApiQuery({
//     name: 'limit',
//     required: false,
//     type: Number,
//     description: 'Number of items to return',
//     default: 15,
//   })
//   @ApiQuery({
//     name: 'page',
//     required: false,
//     type: Number,
//     description: 'Page number for pagination',
//     default: 1,
//   })
//   @Get()
//   async getChats(@Query() query: GetChatsDto, @CurrentUser() user: any) {
//     query.userId = user.id;
//     try {
//       return this.chatService.getChats(query);
//     } catch (error) {
//       console.log('error=>', error);
//       throw new UnauthorizedException('Invalid or expired token.');
//     }
//   }

//   @Get('all')
//   async getAllChats(@Query() query: GetChatsDto, @CurrentUser() user: any) {
//     query.userId = user.id;
//     try {
//       const allChats = await this.chatService.getAllChats(query);
//       return { success: true, data: allChats };
//     } catch (error) {
//       console.log('error=>', error);
//       throw new UnauthorizedException('Invalid or expired token.');
//     }
//   }

//   @Get(':id')
//   async getChatById(
//     @Param('id', ParseObjectIdPipe) id: string, // This should apply the pipe
//     @Res() response: Response,
//   ) {
//     console.log('Received id in controller:', id); // This will help you confirm if the controller is being called

//     return this.chatService.getChatById(id, response);
//   }

//   @Put(':id')
//   updateChat(
//     @Param('id', ParseObjectIdPipe) id: string,
//     @Body() UpdateChatDto: UpdateChatDto,
//     @Res() response: Response,
//   ) {
//     return this.chatService.update(id, UpdateChatDto, response);
//   }

//   @Delete(':id')
//   removeChat(
//     @Param('id', ParseObjectIdPipe) id: string,
//     @Res() response: Response,
//   ) {
//     return this.chatService.remove(id, response);
//   }

//   @ApiQuery({
//     name: 'limit',
//     required: false,
//     type: Number,
//     description: 'Number of items to return',
//     default: 15,
//   })
//   @ApiQuery({
//     name: 'page',
//     required: false,
//     type: Number,
//     description: 'Page number for pagination',
//     default: 1,
//   })
//   @Get(':id/messages')
//   async getChatMessages(
//     @Param('id', ParseObjectIdPipe) id: string,
//     @Query() query: GetChatMessagesDto,
//     @Res() response: Response,
//     @CurrentUser() user: any,
//   ) {
//     console.log('chat messages');
//     await this.chatService.checkChatPermission(id, user.id);

//     // if (!id || !id.trim()) {
//     //   throw new BadRequestException('Chat ID is required.');
//     // }

//     // if (!/^[0-9a-fA-F]{24}$/.test(id)) {
//     //   throw new BadRequestException('Invalid chat ID format.');
//     // }

//     const messages = await this.chatService.getMessagesByChatId(
//       id,
//       query,
//       response,
//       // user,
//     );

//     // if (!messages || messages.length === 0) {
//     //   throw new NotFoundException('No messages found for this chat.');
//     // }
//     return messages;
//   }

//   @Post(':id/messages')
//   async createMessage(
//     @Param('id', ParseObjectIdPipe) id: string,

//     @Body() createMessageDto: CreateMessageDto,
//     @CurrentUser() user: any,
//   ) {
//     createMessageDto.senderId = user.id;
//     createMessageDto.chatId = id;

//     await this.chatService.checkChatPermission(id, user.id);

//     const messageSend = await this.chatService.createMessage(createMessageDto);
//     console.log('messageSend=>', messageSend);
//     const chatUsers = await this.chatService.getChatUsers(id);
//     console.log('chatUsers=>', chatUsers);

//     const notificationUsers =
//       chatUsers?.map((x) => x.userId)?.filter((x) => x != user.id) ?? [];

//     const notificationData = {
//       type: NotificationTypeEnum.MESSAGE,
//       title: `${user.name} has sent a message`,
//       message: createMessageDto.content,
//       // message: `${user.name} has sent you a message`,
//       recipients: notificationUsers,
//       data: {
//         id: messageSend.id,
//         chatId: messageSend.chatId,
//         senderId: messageSend.senderId,
//         content: messageSend.content,
//         messageType: messageSend.messageType,
//       },
//     };

//     await this.notificationService.create(notificationData);
//     this.webSocketServices.receiveMessage(messageSend);

//     return {
//       status: 'success',
//       message: `Message sent successfully`,
//       data: messageSend,
//     };
//   }
// }
