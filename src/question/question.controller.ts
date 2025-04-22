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
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { GetQuestionDto } from './dto/get-question.dto';

import { Roles } from 'src/decorators/roles.decorators';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('question')
@ApiBearerAuth()

// @UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(private readonly QuestionService: QuestionService) {}

  @Get()
  @Roles('admin')
  getAllQuestion(@Query() query: GetQuestionDto) {
    return this.QuestionService.getquestion(query);
  }

  @Post()
  @Roles('admin')
  createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @Res() response: Response,
  ) {
    return this.QuestionService.create(createQuestionDto, response);
  }

  @Get(':id')
  @Roles('admin')
  getQuestion(@Param('id') id: string, @Res() response: Response) {
    return this.QuestionService.getquestionById(id, response);
  }

  @Put(':id')
  @Roles('admin')
  updateQuestion(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @Res() response: Response,
  ) {
    return this.QuestionService.update(id, updateQuestionDto, response);
  }

  @Delete(':id')
  @Roles('admin')
  removeQuestion(@Param('id') id: string, @Res() response: Response) {
    return this.QuestionService.remove(id, response);
  }
}
