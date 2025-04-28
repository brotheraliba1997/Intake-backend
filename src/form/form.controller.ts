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

import { ApiBearerAuth } from '@nestjs/swagger';
import { FormService } from './form.service';

@Controller('form')
@ApiBearerAuth()
export class FormController {
  constructor(private readonly formService: FormService) {}  // Use the correct type here

  @Get()
  getAllForms(@Query() query: any) {
    return this.formService.getForms();
  }
}
