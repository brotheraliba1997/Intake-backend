import { PickType } from '@nestjs/swagger';
import { SaleItemDto } from '../entities/sale.entity';

export class CreateSaleDto extends PickType(SaleItemDto, [
  'productPointId',
  'quantity',

  
]) {}
