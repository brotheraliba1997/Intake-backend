import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { AnswerController } from './answer.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
