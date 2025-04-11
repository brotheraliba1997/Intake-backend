import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { ServiceController } from './service.controller';
import { NotificationModule } from 'src/notification/notification.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, UserModule, NotificationModule],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
