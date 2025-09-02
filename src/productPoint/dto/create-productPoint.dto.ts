import { PickType } from '@nestjs/swagger';
import { ProductPoint } from '../entities/product.entity';

export class CreateProductPointDto extends PickType(ProductPoint, [
  'name',
  'sku',
  'barcode',
  'price',
  'stockQty',
  'image',
]) {}
