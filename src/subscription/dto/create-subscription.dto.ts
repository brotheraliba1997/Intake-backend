import { PickType } from '@nestjs/swagger';
import { BusinessDetails, Subscription } from '../entities/subscription.entity';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSubscriptionDto extends PickType(Subscription, [
  'clientId',
  'payeeType',
  'services',
  'setupFee',
  'subscriptionFee',
  'summary',
 
  'businessDetails',
]) {}
