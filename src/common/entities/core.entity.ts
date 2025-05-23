import { Type } from 'class-transformer';

export class CoreEntity {
  id: any;
  @Type(() => Date)
  created_at?: Date;
  @Type(() => Date)
  updated_at?: Date;

  @Type(() => Date)
  createdAt?: Date;
  @Type(() => Date)
  updatedAt?: Date;
}
