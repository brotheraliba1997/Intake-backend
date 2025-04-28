import { Module } from '@nestjs/common';
import { FormService } from './form.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { FormController } from './form.controller';

@Module({
  imports: [PrismaModule],
  controllers: [FormController],
  providers: [FormService],
  exports: [FormService],
})
export class FormModule {}
