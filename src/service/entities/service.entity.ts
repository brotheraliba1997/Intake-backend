import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class Service {
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
  description: string;

  @ApiProperty({
    description: 'Setup Fee (optional)',
    example: 100.0,
  })
  @Transform(({ value }) => (value ? parseFloat(value) : value))
  @IsNumber()
  @IsOptional()
  setupFee?: number;

  @ApiProperty({
    description: 'Monthly Fee (optional)',
    example: 50.0,
  })
  @Transform(({ value }) => (value ? parseFloat(value) : value))
  @IsNumber()
  @IsOptional()
  monthlyFee?: number;

  @ApiProperty({
    description: 'Parent Service ID (optional)',
    example: 'parent-service-id',
  })
  @IsString()
  @IsOptional()
  parentId?: string;

  @ApiProperty({
    description: 'Service Level (optional)',
    example: 1,
  })
  @Transform(({ value }) => (value ? parseInt(value, 10) : value))
  @IsNumber()
  @IsOptional()
  level?: number;
}
