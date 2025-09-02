import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductPoint {
  id: string;

  @ApiProperty({
    description: 'Name of the user',
    example: 'ABC Health Insurance',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({ description: 'Address of the provider' })
  @IsNotEmpty()
  @Min(0)
  price?: number;

  @IsNotEmpty()
  @Min(0)
  stockQty: number;

  @IsOptional()
  @IsString()
  barcode: string;
}
