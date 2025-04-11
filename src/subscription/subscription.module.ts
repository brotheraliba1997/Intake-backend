import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { SubscriptionController } from './subscription.controller';
// import { ClientDeviceModule } from 'src/clientDevice/clientDevice.module';

@Module({
  imports: [PrismaModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
