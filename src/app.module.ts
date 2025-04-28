import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
// import { ProviderModule } from './provider/provider.module';
import { CompanyModule } from './company/company.module';
import { QuestionModule } from './question/question.module';


// import { ChatModule } from './chat/chat.module';
import { NotificationModule } from './notification/notification.module';
// import { WebSocketModule } from './websocket/websocket.module';

// import { MeetingRoomModule } from './meetingRoom/meetingRoom.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { FormModule } from './form/form.module';

// import { UserSessionModule } from './userSession/userSession.module';

// import { MeetingDetailModule } from './meetingDetail/meetingDetail.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    CompanyModule,
    QuestionModule,
    // ProviderModule,

    // ChatModule,
   
    NotificationModule,
    SubscriptionModule,
    FormModule,
    


    // UserSessionModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
