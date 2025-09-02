import { PartialType } from '@nestjs/swagger';
// import { CreateCompanyDto } from './create-company.dto';
import { CreateSaleDto } from './create-sale.dto';

export class UpdateProductPointDto extends PartialType(CreateSaleDto) {}
