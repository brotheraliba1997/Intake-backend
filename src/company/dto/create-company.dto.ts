import { PickType } from '@nestjs/swagger';
import { Company } from '../entities/company.entity';

export class CreateCompanyDto extends PickType(Company, [
  'name',
  'email',
  'phone',
  'address',
  'state',
  'city',
  'zipCode',
  'description',
  'profilePic',
]) {}
