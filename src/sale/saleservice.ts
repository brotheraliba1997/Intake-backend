import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createSale(items: { productPointId: string; quantity: number }[]) {
    let totalAmount = 0;
    const saleItemsData = [];

    for (const item of items) {
      const product = await this.prisma.productPoint.findUnique({
        where: { id: item.productPointId },
      });

      if (!product) {
        throw new Error(`Product ${item.productPointId} not found`);
      }

      if (product.stockQty < item.quantity) {
        throw new Error(`Product ${product.name} has insufficient stock`);
      }

      // ✅ stock reduce karna
      await this.prisma.productPoint.update({
        where: { id: item.productPointId },
        data: { stockQty: { decrement: item.quantity } },
      });

      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      saleItemsData.push({
        productPointId: item.productPointId,
        quantity: String(item.quantity),
        price: product.price,
        subtotal,
      });
    }

   
    if (saleItemsData.length === 0) {
      throw new Error('No valid sale items provided');
    
    }

   

    const invoiceNumber = `INV-${Date.now()}`;

    return this.prisma.sale.create({
      data: {
        invoiceNumber,
        totalAmount,
        SaleItem: {
          create: saleItemsData,
        },
      },
      include: {
        SaleItem: {
          include: { product: true },
        },
      },
    });
  }

  async getSales() {
    return this.prisma.sale.findMany({
      include: {
        SaleItem: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getSaleById(id: string) {
    return this.prisma.sale.findUnique({
      where: { id },
      include: {
        SaleItem: {
          include: { product: true },
        },
      },
    });
  }
}
