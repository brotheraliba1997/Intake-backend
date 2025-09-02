import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductService } from './saleservice';

import { Public } from 'src/decorators/public-route.decorators';
import { CreateSaleDto } from './entities/sale.entity';

@Controller('sale')
@Public()

// @UseGuards(JwtAuthGuard)
export class SaleController {
  constructor(private readonly saleService: ProductService) {}

  @Post()
  async create(@Body() dto: CreateSaleDto) {
    return this.saleService.createSale(dto.items);
  }

  @Get()
  async findAll() {
    return this.saleService.getSales();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.saleService.getSaleById(id);
  }
}
