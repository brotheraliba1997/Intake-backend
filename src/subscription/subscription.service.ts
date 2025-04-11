import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

import { paginate } from 'src/common/pagination/paginate';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  SubscriptionPaginator,
  GetSubscriptionsDto,
} from './dto/get-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async create(request: CreateSubscriptionDto): Promise<any> {
    const {
      clientId,
      payeeType,
      businessDetails,
      services,
      setupFee,
      subscriptionFee,
      summary,
    } = request;

    // Client ID ka record database mein check karein
    const existingSubscription = await this.prisma.subscription.findFirst({
      where: { clientId },
    });

    if (existingSubscription) {
      throw new BadRequestException(
        'Subscription already exists for this client',
      );
    }

    let bussinesDetailsFound = null;
    if (payeeType === 'Bussiness') {
      try {
        bussinesDetailsFound = await this.prisma.businessDetails.create({
          data: businessDetails,
        });
      } catch (error) {
        console.log(error, "Bussiness")
        if (error?.meta?.target == 'subscription_email_key') {
          throw new BadRequestException(
            'Business already exists with this email',
          );
        } else if (error?.meta?.target == 'subscription_phone_key') {
          throw new BadRequestException(
            'Business already exists with this phone',
          );
        } else {
          throw new BadRequestException('Bussiness data is missing');
        }
      }
    }

    const today = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(today.getDate() + 30);
    expiryDate.setHours(0, 0, 0, 0);

    // Agar clientId pehle se nahi hai, toh naya subscription create karein
    const SubscriptionData = await this.prisma.subscription.create({
      data: {
        clientId,
        payeeType,
        services: {
          create: services.map((item) => ({
            serviceId: item,
          })),
        },
        businessDetailsId: bussinesDetailsFound
          ? bussinesDetailsFound.id
          : null,
        setupFee,
        subscriptionFee,
        summary,
        expiryAt: expiryDate,
      },
      include: {
        services: {
          select: {
            service: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });
    return SubscriptionData;
  }

  async updateSubscription(id, response): Promise<any> {
    const today = new Date();
    const expiryDate = new Date(today.setDate(today.getDate() + 30));
    expiryDate.setHours(0, 0, 0, 0);

    try {
      const updateSubscription = await this.prisma.subscription.update({
        where: { id },
        data: {
          expiryAt: expiryDate,
        },
      });
      return response.status(200).send({
        status: 'success',
        message: 'Subscription created successfully',
        data: updateSubscription,
      });
    } catch (error) {
      return response.status(422).send({
        status: 'error',
        message: 'Bussiness data is missiong ',
      });
    }
  }

  async update(
    id: string,
    request: UpdateSubscriptionDto,
    response,
  ): Promise<any> {
    const {
      clientId,
      payeeType,
      businessDetails,
      services,
      setupFee,
      subscriptionFee,
      summary,
    } = request;

    try {
      const existingRecord = await this.prisma.subscription.findFirst({
        where: { id },
      });

      if (existingRecord.clientId !== clientId) {
        // 123 !== 123 = false
        return response.status(422).send({
          status: 'error',
          message: 'Only this clientId is allowed, others are not permitted',
        });
      }

      let bussinesDetailData = null;
      if (existingRecord?.businessDetailsId) {
        if (payeeType === 'Bussiness') {
          bussinesDetailData = await this.prisma.businessDetails.update({
            where: { id: existingRecord.businessDetailsId },
            data: businessDetails,
          });
        } else if (payeeType === 'Individual') {
          await this.prisma.businessDetails.delete({
            where: { id: existingRecord.businessDetailsId },
          });
        }
      } else if (payeeType === 'Bussiness') {
        bussinesDetailData = await this.prisma.businessDetails.create({
          data: businessDetails,
        });
      }

      const subscription = await this.prisma.subscription.update({
        where: { id },
        data: {
          clientId,
          payeeType,
          businessDetailsId: bussinesDetailData ? bussinesDetailData?.id : null,
          services: {
            create: services.map((item) => ({
              serviceId: item,
            })),
          },
          setupFee,
          subscriptionFee,
          summary,
        },
      });
      return response.status(200).send({
        status: 'success',
        message: 'Subscription updated successfully',
        data: subscription,
      });
    } catch (error) {
      if (error?.meta?.target == 'clientId') {
        return response.status(422).send({
          status: 'error',
          message: 'clientId already exists with this',
        });
      } else {
        console.error('Error:', error);
        return response.status(422).send({
          status: 'error',
          message: 'Something went wrong while updating subscription',
          meta: error.message,
        });
      }
    }
  }

  async getSubscriptionById(id: string, response): Promise<any> {
    try {
      const subscription = await this.prisma.subscription.findUnique({
        where: { id },
        include: {
          client: true,
          services: true,
          businessDetails: true

        }
      });
      return response.status(200).send({
        data: subscription,
        status: 'success',
      });
    } catch (error) {
      console.log('err=>', error);
      return response.status(422).send({
        status: 'error',
        message: 'Something went wrong.',
        meta: error.message,
      });
    }
  }

  async getSubscriptions({
    limit = 30,
    page = 1,
    search,
  }: GetSubscriptionsDto): Promise<any> {
    const parsedLimit = Number(limit) || 30;
    const parsedPage = Number(page) || 1;

    const skip = (parsedPage - 1) * parsedLimit;

    const where: any = {};

    if (search && search.trim()) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ];
    }

    // Fetch subscriptions with selected fields and role name, and total count in parallel
    const [results, totalCount] = await Promise.all([
      this.prisma.subscription.findMany({
        where: {
          ...where,
        },
        include: {
          businessDetails: true,
          client: true
        },
        skip,
        take: parsedLimit,
      }),
      this.prisma.subscription.count({ where }),
    ]);

    // Generate the pagination URL
    const url = `/subscriptions?limit=${parsedLimit}&page=${parsedPage}`;

    return {
      data: results,
      ...paginate(totalCount, parsedPage, parsedLimit, results.length, url),
    };
  }

  async findOne(id: string) {
    return this.prisma.subscription.findUnique({
      where: { id },
    });
  }

  async remove(id: string, response) {
    try {
      const user = await this.prisma.subscription.findUnique({
        where: { id },
      });

      if (!user) {
        throw new BadRequestException('User not found.');
      }

      await this.prisma.subscription.delete({
        where: { id },
      });

      return response.status(200).send({
        status: 'success',
        message: `subscription with ID ${id}   have been successfully deleted.`,
      });
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        message:
          error.message ||
          'An unexpected error occurred while deleting the subscription.',
      });
    }
  }

  async checkingSubscription(id, response): Promise<any> {
    console.log(id, 'id');
    try {
      const updateSubscription = await this.prisma.subscription.findFirst({
        where: { clientId: id },
      });
      return response.status(200).send({
        status: 'success',
        message: 'Subscription created successfully',
        data: updateSubscription,
      });
    } catch (error) {
      return response.status(422).send({
        status: 'error',
        message: 'subscription data is missiong ',
      });
    }
  }
}
