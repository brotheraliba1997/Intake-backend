import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationController } from './notification.controller';
// import { WebSocketModule } from 'src/websocket/websocket.module';
// import { FCMService } from './fcm.service';
import { OneSignalService } from './onesignal.service';
// import { UserSessionModule } from 'src/userSession/userSession.module';

@Module({
  imports: [PrismaModule],
  // imports: [PrismaModule, WebSocketModule, UserSessionModule],
  controllers: [NotificationController],
  providers: [NotificationService, OneSignalService],
  exports: [NotificationService, OneSignalService],
})
export class NotificationModule {}
