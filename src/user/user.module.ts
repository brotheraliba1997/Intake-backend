import { Module } from '@nestjs/common';
import { UserService } from './user.service';

import { JwtService } from '@nestjs/jwt';

import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [PrismaModule, NotificationModule],
  controllers: [UserController],
  providers: [UserService,  JwtService],
  exports: [UserService],
})
export class UserModule {}
