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
  constructor(private readonly formService: FormService) {} // Use the correct type here

  @Get(':id')
  getOneForms(@Query() query: any, @Param('id') id: string) {
    return this.formService.getOneForms(id);
  }

  @Get()
  getAllForms(
    @Query() query: any,
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    return this.formService.getAllForms(id, response);
  }
}
