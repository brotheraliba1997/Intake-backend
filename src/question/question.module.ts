import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { QuestionController } from './question.controller';

@Module({
  imports: [PrismaModule],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
