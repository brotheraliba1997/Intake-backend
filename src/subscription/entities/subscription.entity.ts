import {
  IsArray,
  IsDate,

  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum PayeeTypeEnum {
  Individual = 'Individual',
  Bussiness = 'Bussiness',
}


export class BusinessDetails {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  contactPersonName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  
}



export class Subscription {
  id: string;

  @ApiProperty({
    description: 'Client ID',
    example: 'Id',
  })
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @ApiProperty({
    description: 'Payee Type ',
    example: ' Individual or  Bussiness',
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(PayeeTypeEnum)
  payeeType: PayeeTypeEnum;

  @ApiProperty({
    description: 'services ',
    example: '[Id,Id]',
  })
  @IsNotEmpty()
  @IsArray()
  services: string[];

  @ApiProperty({ description: 'setup Fee', example: 4000.5 }) // Example as Float
  @IsNotEmpty()
  @IsNumber({}, { message: 'setup Fee must be a valid number' }) // Ensures number type
  setupFee: number;

  @ApiProperty({ description: 'Subscription Fee', example: 4000.5 }) // Example as Float
  @IsNotEmpty()
  @IsNumber({}, { message: 'subscriptionFee must be a valid number' }) // Ensures number type
  subscriptionFee: number;

  
 

  @ApiProperty({ description: 'summary', example: 'string' })
  @IsNotEmpty()
  @IsString()
  summary: string;

  @ApiProperty({ description: 'BusinessDetails', example: 'BusinessDetails' })

  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  @Type(() => BusinessDetails)
  businessDetails?: BusinessDetails;
}


