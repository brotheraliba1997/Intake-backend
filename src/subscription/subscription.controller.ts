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
  Response,
  ForbiddenException,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { GetSubscriptionsDto } from './dto/get-subscription.dto';
import { CurrentUser } from 'src/decorators/current-user.decorators';
import { Roles } from 'src/decorators/roles.decorators';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('subscription')
@ApiBearerAuth()

// @UseGuards(JwtAuthGuard)
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService,
   
  ) {}

  @Post()
  @Roles('admin')
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    const subscriptionCreated = await this.subscriptionService.create(
      createSubscriptionDto,
    );

    // const createClientDevices =
    // await this.clientDeviceService.createMultipleDevices({
    //   clientId: subscriptionCreated.clientId,
    //   devices: subscriptionCreated.services.map((x: any) => ({
    //     serviceId: x.service.id,
    //     title: x.service.name.trim(),
    //     type: x.service.name.trim().replaceAll(' ', '_').toLowerCase(),
    //   })),
    // });

    return {
      status: 'success',
      message: 'Subscription created successfully',
      data: subscriptionCreated,
    };
  }

  @Get()
  @Roles('admin')
  getAllsubscriptions(@Query() query: GetSubscriptionsDto) {
    return this.subscriptionService.getSubscriptions(query);
  }

  @Get('is-subscription-active')
  checkingSubscription(@Res() response: Response, @CurrentUser() user: any) {
    if (user?.role === 'client') {
      let id = user?.id;
      return this.subscriptionService.checkingSubscription(id, response);
    }
  }

  @Get(':id')
  @Roles('admin')
  getSubscription(
    @Param('id') id: string,
    @Res() response: Response,
    @CurrentUser() user: any,
  ) {
    return this.subscriptionService.getSubscriptionById(id, response);
  }

  @Put(':id')
  @Roles('admin')
  updateSubscription(
    @Param('id') id: string,
    @Body() UpdateSubscriptionDto: UpdateSubscriptionDto,
    @Res() response: Response,
  ) {
    return this.subscriptionService.update(id, UpdateSubscriptionDto, response);
  }

  @Delete(':id')
  @Roles('admin')
  removeSubscription(@Param('id') id: string, @Res() response: Response) {
    return this.subscriptionService.remove(id, response);
  }

  @Put(':id/renew')
  @Roles('admin')
  renewingSubscription(
    @Res() response: Response,
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.subscriptionService.updateSubscription(id, response);
  }
}
