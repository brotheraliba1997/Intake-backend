import { PickType } from '@nestjs/swagger';
import { Service } from '../entities/service.entity';

export class CreateServiceDto extends PickType(Service, ['name', "description", "setupFee", "monthlyFee", "parentId", "level"]) {}
