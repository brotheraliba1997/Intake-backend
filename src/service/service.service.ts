import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { GetServicesDto, ServicePaginator } from './dto/get-services.dto';
import { paginate } from 'src/common/pagination/paginate';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class ServiceService {
  constructor(
    private prisma: PrismaService,
    // private notificationService: NotificationService,
  ) {}

  async create(request: CreateServiceDto): Promise<any> {
    const { name, description, setupFee, monthlyFee, level, parentId } =
      request;

    // let level = 0;

    // try {
    // if (parentId) {
    //   const isParentExists = await this.prisma.service.findFirst({
    //     where: {
    //       id: parentId,
    //     },
    //   });

    //   if (isParentExists) {
    //     level = isParentExists.level + 1;
    //   } else {
    //     return response.status(400).send({
    //       status: 'error',
    //       message: 'Invalid parentId provided.',
    //     });
    //   }
    // }

    const obj: CreateServiceDto = {
      name,
      description,
      setupFee,
      monthlyFee,
      level,
    };

    if (parentId && parentId.length > 0) {
      obj.parentId = parentId;
    }

    console.log('req=>', obj);
    const service = await this.prisma.service.create({
      data: obj,
    });
    return service;
    // const user = await this.prisma.user.findMany({
    //   where: { role: { not: 'super_admin' } },
    // });
    // const userIds = user.map((x) => x.id);
    // const notificationData = {
    //   type: 'ALERT',
    //   title: 'New Service ',
    //   message: `introduce a new serviceS`,

    //   recipients: userIds,
    // };

    // await this.notificationService.create(notificationData);
    //   return response.status(200).send({
    //     status: 'success',
    //     message: 'Service created successfully',
    //     data: service,
    //   });
    // } catch (error) {
    //   console.log(error);
    //   return response.status(500).send({
    //     status: 'error',
    //     message: error.message || 'An unexpected error occurred.',
    //   });
    // }
  }

  async updateStatus(
    id: string,
    request: UpdateServiceDto,
    response,
  ): Promise<any> {
    const {} = request;

    try {
      const service = await this.prisma.service.update({
        where: { id },
        data: {},
      });
      return response.status(200).send({
        status: 'success',
        message: 'Service status updated successfully',
      });
    } catch (error) {
      return response.status(422).send({
        status: 'error',
        message: 'Something went wrong while updating account',
        meta: error.message,
      });
    }
  }

  async getServiceById(id: string, response): Promise<any> {
    try {
      const service = await this.prisma.service.findUnique({
        where: { id },
        // select: {
        //   id: true,

        //   name: true,

        //   // role: {
        //   //   select: {
        //   //     id: true,
        //   //   },
        //   // },
        // },
      });
      return response.status(200).send({
        data: service,
        status: 'success',
        // message:"Service status updated successfully"
        // token: token,
        // role: role.name,
      });
    } catch (error) {
      return response.status(422).send({
        status: 'error',
        message: 'Something went wrong while updating account',
        meta: error.message,
      });
    }
  }

  async getServices({
    limit = 30, // Default limit
    page = 1, // Default page
   
    search,
    level = 0
  }: GetServicesDto): Promise<ServicePaginator> {
    const parsedLimit = Number(limit) || 30; // Ensure parsedLimit is a number
    const parsedPage = Number(page) || 1; // Ensure parsedPage is a number

    const skip = (parsedPage - 1) * parsedLimit;

    // Build the where clause based on the search criteria
    const where: any = {
      level,
    };

    if (search && search.trim()) {
      where.OR = [{ name: { contains: search } }];
    }

    // Fetch services with selected fields and role name, and total count in parallel
    const [results, totalCount] = await Promise.all([
      this.prisma.service.findMany({
        where: {
          ...where,
        },
        include: {
          children: true,
        },
        skip,
        take: parsedLimit,
      }),
      this.prisma.service.count({ where }),
    ]);
    const url = `/services?limit=${parsedLimit}&page=${parsedPage}`;
    return {
      data: results,
      ...paginate(totalCount, parsedPage, parsedLimit, results.length, url),
    };
  }

  async findOne(id: string) {
    return this.prisma.service.findUnique({
      where: { id },
      include: {},
    });
  }

  async findByName(name: string) {
    return this.prisma.service.findFirst({
      where: { name },
      include: {},
    });
  }

  async updateService(
    id: string,
    request: UpdateServiceDto,
    response,
  ): Promise<any> {
    const { name, description, setupFee, monthlyFee, parentId } = request;
    let level = 0;
    try {
      const existingService = await this.prisma.service.findFirst({
        where: {
          id: { not: id },
          name: name,
        },
      });

      if (existingService) {
        return response.status(409).send({
          status: 'error',
          message: `The service name "${name}" already exists. Please choose a different name.`,
        });
      }
      if (parentId) {
        const isParentExists = await this.prisma.service.findFirst({
          where: {
            id: parentId,
          },
        });

        if (isParentExists) {
          level = isParentExists.level + 1;
        } else {
          return response.status(400).send({
            status: 'error',
            message: 'Invalid parentId provided.',
          });
        }
      }
      const service = await this.prisma.service.update({
        where: { id },
        data: {
          name,
          description,
          setupFee,
          monthlyFee,
          parentId,
          level,
        },
      });
      return response.status(200).send({
        status: 'success',
        message: 'Service updated successfully',
        data: service,
      });
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        message: error.message || 'An unexpected error occurred.',
      });
    }
  }

  async remove(id: string, response) {
    try {
      const children = await this.prisma.service.findMany({
        where: { parentId: id },
      });

      for (const child of children) {
        await this.prisma.service.delete({
          where: { id: child.id },
        });
      }

      await this.prisma.service.delete({
        where: { id },
      });

      return response.status(200).send({
        status: 'success',
        message: `Service with ID ${id} and all its children have been successfully deleted.`,
      });
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        message:
          error.message ||
          'An unexpected error occurred while deleting the service.',
      });
    }
  }
}
