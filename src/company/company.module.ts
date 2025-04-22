import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { CompanyController } from './company.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
