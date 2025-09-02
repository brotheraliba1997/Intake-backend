import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Res,
  Response,
  Get,
} from '@nestjs/common';
import { ProductService } from './productservice';
import { CreateProductPointDto } from './dto/create-productPoint.dto';
import { Public } from 'src/decorators/public-route.decorators';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('product')
@ApiBearerAuth()

// @UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(private readonly companyService: ProductService) {}

  @Public()
  @Post()
  createProduct(
    @Body() CreateProductPointDto: CreateProductPointDto,
    @Res() response: Response,
  ) {
    return this.companyService.create(CreateProductPointDto, response);
  }

  @Public()
  @Get(':id')
  async GetSingleProduct(@Param('id') id: string, @Res() response: Response) {
    return this.companyService.GetSingleProduct(id, response);
  }

  @Public()
  @Get()
  async GetAllProducts(@Res() response: Response) {
    return this.companyService.GetProducts(response);
  }

  @Public()
  @Put(':id')
  // @Roles('super_admin')
  UpdateProduct(
    @Param('id') id: string,
    @Body() CreateProductPointDto: CreateProductPointDto,
    @Res() response: Response,
  ) {
    return this.companyService.Update(id, CreateProductPointDto, response);
  }
}
