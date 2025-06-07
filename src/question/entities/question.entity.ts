import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

enum InputTypeOption {
  file = 'file',
  text = 'text',
  radio = 'radio',
  checkbox = 'checkbox',
  table = 'table',
  html = 'html',
  textarea = 'textarea',
  date = 'date',
  Signature = 'Signature',
  number = 'number',
  email = 'email',
}

export class Question {
  id: string;

  @ApiProperty({
    description: 'Make Question',
    example: 'what is your age ',
  })
  @IsNotEmpty()
  @IsString()
  text?: string;

  @ApiProperty({
    description: 'Question option',
    example: 'value , QuestionId',
  })
  @IsOptional()
  @IsArray()
  @Type(() => CustomOptionDto)
  options: CustomOptionDto[];

  @ApiProperty({
    description: 'Question type',
    example: 'file , text , radio , checkbox',
  })
  @IsNotEmpty()
  @IsEnum(InputTypeOption)
  inputType: InputTypeOption;
}

export class CustomOptionDto {
  @ApiProperty({
    description: 'Option value',
    example: '',
  })
  @IsOptional()
  @IsString()
  value: string;

  @ApiProperty({
    description: 'question Id',
    example: 'given id',
  })
  @IsOptional()
  @IsString()
  questionId?: string;
}
