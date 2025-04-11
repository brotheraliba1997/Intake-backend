// import {
//   BadRequestException,
//   Injectable,
//   NotFoundException,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { CreateChatDto, CreateMessageDto } from './dto/create-chat.dto';
// import {
//   GetChatsDto,
//   ChatPaginator,
//   GetChatMessagesDto,
// } from './dto/get-chat.dto';
// import { paginate } from 'src/common/pagination/paginate';
// import { UpdateChatDto } from './dto/update-chat.dto';
// import { PrismaService } from 'src/prisma/prisma.service';

// @Injectable()
// export class ChatService {
//   constructor(private prisma: PrismaService) {}

//   async create(request: CreateChatDto): Promise<any> {
//     const { name, isGroup, participants } = request;
//     const chatCreate = await this.prisma.chat.create({
//       data: {
//         name,
//         isGroup,
//         participants: {
//           create: participants.map((item: any) => ({
//             userId: item,
//           })),
//         },
//       },
//       include: {
//         participants: true,
//       },
//     });
//     return chatCreate;
//   }

//   async update(id: string, request: UpdateChatDto, response): Promise<any> {
//     // const { name, description } = request;
//     // try {
//     //   const existingRecord = await this.prisma.program.findFirst({
//     //     where: {
//     //       id: { not: id },
//     //       OR: [{ name: name }],
//     //     },
//     //   });
//     //   if (existingRecord) {
//     //     return response.status(409).send({
//     //       status: 'error',
//     //       message: `Validation failed: ${existingRecord?.name} already exists`,
//     //     });
//     //   }
//     //   const provider = await this.prisma.program.update({
//     //     where: { id },
//     //     data: {
//     //       name,
//     //       description,
//     //     },
//     //   });
//     //   return response.status(200).send({
//     //     status: 'success',
//     //     message: 'Program updated successfully',
//     //     data: provider,
//     //   });
//     // } catch (error) {
//     //   return response.status(422).send({
//     //     status: 'error',
//     //     message: 'Something went wrong while creating account',
//     //     meta: error.message,
//     //   });
//     // }
//   }

//   // async updateStatus(
//   //   id: string,
//   //   request: UpdateChatDto,
//   //   response,
//   // ): Promise<any> {
//   //   const {} = request;

//   //   try {
//   //     const program = await this.prisma.program.update({
//   //       where: { id },
//   //       data: {
//   //         // account_status: account_status,
//   //       },
//   //     });
//   //     return response.status(200).send({
//   //       status: 'success',
//   //       message: 'Program status updated successfully',
//   //       // token: token,
//   //       // role: role.name,
//   //     });
//   //   } catch (error) {
//   //     return response.status(422).send({
//   //       status: 'error',
//   //       message: 'Something went wrong while updating account',
//   //       meta: error.message,
//   //     });
//   //   }
//   // }

//   async getChatById(id: string, response): Promise<any> {
//     const chatFound = await this.prisma.chat.findUnique({
//       where: { id },
//     });

//     if (!chatFound) {
//       throw new BadRequestException('Chat not found.');
//     }

//     // Success response
//     return response.status(200).send({
//       status: 'success',
//       message: `Chat with ID ${id} found successfully.`,
//       data: chatFound,
//     });
//   }

//   async getChatUsers(id: string): Promise<any> {
//     const chatUsersFound = await this.prisma.chatUser.findMany({
//       where: { chatId: id },
//     });

//     if (!chatUsersFound) {
//       throw new BadRequestException('Chat Users not found.');
//     }

//     // Success response
//     return chatUsersFound;
//   }

//   async getChats({
//     limit = 30,
//     page = 1,
//     search,
//     userId,
//   }: GetChatsDto): Promise<ChatPaginator> {
//     const parsedLimit = Number(limit) || 30;
//     const parsedPage = Number(page) || 1;

//     const skip = (parsedPage - 1) * parsedLimit;

//     const where: any = {};

//     if (search && search.trim()) {
//       where.OR = [{ name: { contains: search } }];
//     }

//     if (userId) {
//       where.participants = {
//         some: {
//           userId: userId,
//         },
//       };
//     }

//     let [results, totalCount] = await Promise.all([
//       this.prisma.chat.findMany({
//         where,
//         include: {
//           lastMessage: {
//             select: { content: true, createdAt: true },
//           },
//           participants: {
//             select: {
//               user: {
//                 select: {
//                   id: true,
//                   firstName: true,
//                   lastName: true,
//                   profileImageUrl: true,
//                 },
//               },
//             },
//           },
//         },
//         skip,
//         take: parsedLimit,
//       }),
//       this.prisma.chat.count({ where }),
//     ]);

//     console.log('results=>', results);
//     // const url = `/chats?limit=${parsedLimit}&page=${parsedPage}`;
//     const url = `/chats?limit=${parsedLimit}`;

//     const formattedResults: any = [];
//     for (let i = 0; i < results.length; i++) {
//       const resultToCheck: any = results[i];
//       console.log('resultToCheck=>', resultToCheck);

//       const userFound = resultToCheck?.participants.find(
//         (x) => x.user && x.user.id !== userId,
//       );
//       delete resultToCheck?.participants;
//       delete resultToCheck?.lastMessageId;

//       resultToCheck.user = userFound?.user;
//       resultToCheck.lastMessage = resultToCheck.lastMessage ?? {
//         content: '',
//         createdAt: '',
//       };
//       formattedResults.push(resultToCheck);
//     }

//     return {
//       data: formattedResults,
//       ...paginate(totalCount, parsedPage, parsedLimit, results.length, url),
//     };
//   }

//   async getAllChats({ userId }: GetChatsDto): Promise<ChatPaginator> {
//     const where: any = {};

//     if (userId) {
//       where.participants = {
//         some: {
//           userId: userId,
//         },
//       };
//     }

//     let [results, totalCount] = await Promise.all([
//       this.prisma.chat.findMany({
//         where,
//         include: {
//           lastMessage: {
//             select: { content: true, createdAt: true },
//           },
//           participants: {
//             select: {
//               user: {
//                 select: {
//                   id: true,
//                   firstName: true,
//                   lastName: true,
//                   profileImageUrl: true,
//                 },
//               },
//             },
//           },
//         },
//       }),
//       this.prisma.chat.count({ where }),
//     ]);

//     console.log('results=>', results);
//     // const url = `/chats?limit=${parsedLimit}&page=${parsedPage}`;
//     // const url = `/chats?limit=${parsedLimit}`;

//     const formattedResults: any = [];
//     for (let i = 0; i < results.length; i++) {
//       const resultToCheck: any = results[i];
//       console.log('resultToCheck=>', resultToCheck);

//       const userFound = resultToCheck?.participants.find(
//         (x) => x.user && x.user.id !== userId,
//       );
//       delete resultToCheck?.participants;
//       delete resultToCheck?.lastMessageId;

//       resultToCheck.user = userFound?.user;
//       resultToCheck.lastMessage = resultToCheck.lastMessage ?? {
//         content: '',
//         createdAt: '',
//       };
//       formattedResults.push(resultToCheck);
//     }

//     return formattedResults;
//     // return {
//     //   data: formattedResults,
//     //   ...paginate(totalCount, parsedPage, parsedLimit, results.length, url),
//     // };
//   }

//   async remove(id: string, response) {
//     try {
//       const user = await this.prisma.program.findUnique({
//         where: { id },
//       });

//       if (!user) {
//         throw new BadRequestException('User not found.');
//       }

//       await this.prisma.program.delete({
//         where: { id },
//       });

//       return response.status(200).send({
//         status: 'success',
//         message: `Deleted Program with ID ${id}.`,
//       });
//     } catch (error) {
//       return response.status(500).send({
//         status: 'error',
//         message:
//           error.message ||
//           'An unexpected error occurred while deleting the Program.',
//       });
//     }
//   }

//   async getMessagesByChatId(
//     id: string,
//     query: GetChatMessagesDto,
//     response,
//   ): Promise<any> {
//     // console.log('query', query);
//     const { limit = 30, page = 1, search } = query;

//     const parsedLimit = Number(limit) || 10;
//     const parsedPage = Number(page) || 1;
//     const skip = (parsedPage - 1) * parsedLimit;

//     // if (!/^[0-9a-fA-F]{24}$/.test(id)) {
//     //   return response
//     //     .status(400)
//     //     .json({ status: 'error', message: 'Invalid chat ID format.' });
//     // }

//     const where: any = { chatId: id };

//     if (search && search.trim()) {
//       where.OR = [{ content: { contains: search, mode: 'insensitive' } }];
//     }

//     const [results, totalCount] = await Promise.all([
//       this.prisma.message.findMany({
//         where,
//         skip,
//         take: parsedLimit,
//         orderBy: { createdAt: 'desc' }, // Latest messages first
//         include: {
//           sender: {
//             select: {
//               firstName: true,
//               lastName: true,
//               profileImageUrl: true,
//             },
//           },
//         },
//       }),
//       this.prisma.message.count({ where }),
//     ]);

//     if (results.length === 0) {
//       return response
//         .status(404)
//         .json({ status: 'error', message: 'No messages found in this chat.' });
//     }

//     const url = `/chats/${id}/messages?limit=${parsedLimit}&page=${parsedPage}&search=${search || ''}`;

//     return response.status(200).json({
//       status: 'success',
//       message: `Messages for chat ID  retrieved successfully.`,
//       data: results,
//       ...paginate(totalCount, parsedPage, parsedLimit, results.length, url),
//     });
//   }

//   // async getOneChat(id: string, response): Promise<any> {
//   //   const messageFound = await this.prisma.message.findUnique({
//   //     where: {
//   //       id: id,
//   //     },
//   //   });

//   //   console.log(messageFound, 'messageFound');

//   //   if (!messageFound) {
//   //     throw new BadRequestException('messages is not found.');
//   //   }

//   //   // Success response
//   //   return response.status(200).send({
//   //     status: 'success',
//   //     message: `Chat with ID ${id} found successfully.`,
//   //     data: messageFound,
//   //   });
//   // }

//   async createMessage(request: CreateMessageDto): Promise<any> {
//     const { chatId, senderId, content, messageType } = request;

//     const messageSent = await this.prisma.message.create({
//       data: {
//         chatId,
//         senderId,
//         content,
//         messageType,
//       },
//     });

//     await this.prisma.chat.update({
//       where: { id: chatId },
//       data: {
//         lastMessageId: messageSent.id,
//       },
//     });

//     return messageSent;
//   }

//   async checkChatPermission(id: string, userId: string): Promise<any> {
//     const hasPermission = await this.prisma.chat.findUnique({
//       where: {
//         id,
//         participants: {
//           some: {
//             userId: userId,
//           },
//         },
//       },
//     });

//     if (!hasPermission) {
//       throw new BadRequestException("You don't have the permission");
//     }

//     return true;
//   }
// }
