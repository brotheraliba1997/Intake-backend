import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { Paginator } from 'src/common/dto/paginator.dto';

export class QuestionData {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export enum InputType {
  FILE = 'file',
  TEXT = 'text',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
}

export class QuestionPaginator extends Paginator<QuestionData> {
  data: QuestionData[];
}

export enum QueryQuestionOrderByColumn {
  NAME = 'name',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  IS_ACTIVE = 'is_active',
}

export class GetQuestionDto extends PaginationArgs {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number) // Transform string to number
  limit?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(QueryQuestionOrderByColumn)
  orderBy?: QueryQuestionOrderByColumn;

  @IsOptional()
  @IsEnum(SortOrder)
  sortedBy?: SortOrder;


}
