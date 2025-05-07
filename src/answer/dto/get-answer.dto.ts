import {
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

export class AnswerData {
  id: string;
  question: string; // ← Yeh field chahiye
  subQuestion: string; // ← Yeh bhi chahiye
  option: string; // ← Yeh bhi chahiye
  value: string;
  multipleValue: string[];
  type: string;
}

export class AnswerPaginator extends Paginator<AnswerData> {
  data: AnswerData[];
}

export enum QueryAnswerOrderByColumn {
  NAME = 'name',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  IS_ACTIVE = 'is_active',
}

export class GetAnswerDto extends PaginationArgs {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number) // Transform string to number
  limit?: number;

  @IsOptional()
  @IsEnum(QueryAnswerOrderByColumn)
  orderBy?: QueryAnswerOrderByColumn;

  @IsOptional()
  @IsEnum(SortOrder)
  sortedBy?: SortOrder;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
