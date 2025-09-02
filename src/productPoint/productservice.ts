import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductPointDto } from './dto/create-productPoint.dto';

import { paginate } from 'src/common/pagination/paginate';
import { UpdateProductPointDto } from './dto/update-productPoint.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyPaginator, GetCompaniesDto } from './dto/get-productPoint.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(request: CreateProductPointDto, response): Promise<any> {
    const { name, sku, barcode, price, stockQty, image } = request;

    try {
      await this.prisma.productPoint.create({
        data: {
          name,
          sku,
          barcode,
          price,
          stockQty,
          image,
        },
      });

      return response.status(200).send({
        status: 'success',
        message: 'Company created successfully',
      });
    } catch (error) {
      console.log(error);
    }
  }

  async Update(
    id: string,
    request: CreateProductPointDto,
    response,
  ): Promise<any> {
    const { name, sku, barcode, price, stockQty, image } = request;

    try {
      await this.prisma.productPoint.update({
        where: { id },
        data: {
          name,
          sku,
          barcode,
          price,
          stockQty,
          image,
        },
      });

      return response.status(200).send({
        status: 'success',
        message: 'Company created successfully',
      });
    } catch (error) {
      console.log(error);
    }
  }

  async GetSingleProduct(id: string, response): Promise<any> {
    const product = await this.prisma.productPoint.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return response.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      data: product,
    });
  }

  async GetProducts(response): Promise<any> {
    const products = await this.prisma.productPoint.findMany();

    if (!products || products.length === 0) {
      throw new NotFoundException(`Products not found`);
    }

    return response.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: products,
    });
  }
}
