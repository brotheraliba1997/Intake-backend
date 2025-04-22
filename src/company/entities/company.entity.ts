import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Company {
  id: string;

  @ApiProperty({
    description: 'Name of the user',
    example: 'ABC Health Insurance',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email of the provider',
    example: 'abc@abchealth.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Phone Number of the provider',
    example: '6026641456',
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'Address of the provider' })
  @IsNotEmpty()
  @IsString()
  address?: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @IsNotEmpty()
  @IsString()
  description?: string;
}
