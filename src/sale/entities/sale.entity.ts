import { IsArray, ValidateNested, IsString, IsMongoId, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SaleItemDto {
  @IsMongoId()
  productPointId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateSaleDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleItemDto)
  items: SaleItemDto[];
}
