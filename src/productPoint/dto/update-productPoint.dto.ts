import { PartialType } from '@nestjs/swagger';
// import { CreateCompanyDto } from './create-company.dto';
import { CreateProductPointDto } from './create-productPoint.dto';

export class UpdateProductPointDto extends PartialType(CreateProductPointDto) {}
