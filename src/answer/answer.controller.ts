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
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { GetAnswerDto } from './dto/get-answer.dto';
import { CurrentUser } from 'src/decorators/current-user.decorators';
import { Roles } from 'src/decorators/roles.decorators';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('answer')
@ApiBearerAuth()

// @UseGuards(JwtAuthGuard)
export class AnswerController {
  constructor(private readonly AnswerService: AnswerService) {}

  @Get('me')
  getMyAnswer(@CurrentUser() user: any, @Res() response: Response) {
    const AnswerId = user.AnswerId;
    // return this.AnswerService.getAnswerById(AnswerId, response);
  }

  @Put('me')
  @Roles('admin')
  updateMyAnswer(
    @CurrentUser() user: any,
    @Body() updateAnswerDto: UpdateAnswerDto,
    @Res() response: Response,
  ) {
    const AnswerId = user.AnswerId;
    // return this.AnswerService.update(AnswerId, updateAnswerDto, response);
  }

  @Post()
  // @Roles('super_admin')
  createAnswer(
    @Body() createAnswerDto: CreateAnswerDto,
    @Res() response: Response,
  ) {
    return this.AnswerService.create(createAnswerDto, response);
  }

  @Get()
  @Roles('super_admin')
  getAllCompanies(@Query() query: GetAnswerDto) {
    // return this.AnswerService.getCompanies(query);
  }

  @Get(':id')
  // @Roles('super_admin')
  getAnswer(
    @Param('id') id: string,
    @Res() response: Response,
    @CurrentUser() user: any,
  ) {
    // if (user?.AnswerId === id || user?.role === 'super_admin') {
    //   return this.AnswerService.getAnswerById(id, response);
    // } else {
    //   throw new ForbiddenException(`Forbidden ${user.role}`);
    // }
  }

  @Put(':id')
  @Roles('super_admin')
  updateAnswer(
    @Param('id') id: string,
    @Body() updateAnswerDto: UpdateAnswerDto,
    @Res() response: Response,
  ) {
    // return this.AnswerService.update(id, updateAnswerDto, response);
  }

  @Delete(':id')
  @Roles('super_admin')
  removeAnswer(@Param('id') id: string, @Res() response: Response) {
    // return this.AnswerService.remove(id, response);
  }
}
