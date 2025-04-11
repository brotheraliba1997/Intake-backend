import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { GetServicesDto } from './dto/get-services.dto';
import { Public } from 'src/decorators/public-route.decorators';
import { ParseObjectIdPipe } from 'src/common/parseObjectIdPipe';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { NotificationService } from 'src/notification/notification.service';

@Controller('services')
@ApiBearerAuth()

// @UseGuards(JwtAuthGuard)
export class ServiceController {
  constructor(
    private readonly serviceService: ServiceService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  @Post()
  async createService(@Body() createServiceDto: CreateServiceDto) {
    const { name, parentId } = createServiceDto;

    const serviceExists = await this.serviceService.findByName(name);

    if (serviceExists) {
      // return response.status(409).send({
      //   status: 'error',
      //   message: `The service name "${name}" already exists. Please choose a different name.`,
      // });
    }
    if (parentId) {
      const isParentExists = await this.serviceService.findOne(parentId);

      if (!isParentExists) {
        throw new BadRequestException('Invalid parentId provided.');
      }
      createServiceDto.level = isParentExists.level + 1;
    }

    const serviceCreated = await this.serviceService.create(createServiceDto);

    const notificationData = {
      type: 'ALERT',
      title: 'New Service',
      message: `Introduced a new service`,

      // recipients: userIds,
    };

    await this.notificationService.sendToAllUsersExceptSuperAdmin(
      notificationData,
    );
    return {
      status: 'success',
      message: 'Service created successfully',
      data: serviceCreated,
    };
  }

  @Get()
  getAllServices(@Query() query: GetServicesDto) {
    return this.serviceService.getServices(query);
  }

  @Get(':id')
  getService(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() response: Response,
  ) {
    return this.serviceService.getServiceById(id, response);
  }

  @Put(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @Res() response: Response,
  ) {
    return this.serviceService.updateService(id, updateServiceDto, response);
  }

  @Public()
  @Delete(':id')
  async removeService(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() response: Response,
  ): Promise<any> {
    return this.serviceService.remove(id, response);
  }
}
