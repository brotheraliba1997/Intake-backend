import { isArray, IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class AnswerItemDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  questionId?: string;

 



  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  value?: string;


  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  signatureLink?: string;

  @ApiProperty({  required: true })
  @IsOptional()
  @IsArray()
  multipleValues?: string[];

  @ApiProperty()
  @IsString()
  type: string;
}

export class AnswerDto {
  @ApiProperty()
  @IsString()
  formId: string;

  @ApiProperty({ type: [AnswerItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerItemDto)
  answers: AnswerItemDto[];
}
