import { Module } from '@nestjs/common';
import { ProductService } from './productservice';

import { PrismaModule } from 'src/prisma/prisma.module';
import { CompanyController } from './company.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CompanyController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
