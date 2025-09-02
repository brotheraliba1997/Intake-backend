import { Module } from '@nestjs/common';
import { ProductService } from './saleservice';

import { PrismaModule } from 'src/prisma/prisma.module';
import { SaleController } from './sale.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SaleController],
  providers: [ProductService],
  exports: [ProductService],
})
export class saleModule {}
