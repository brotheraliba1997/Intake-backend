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
import { PrismaService } from 'src/prisma/prisma.service';
import { InputTypeOption } from '@prisma/client';
import { Public } from 'src/decorators/public-route.decorators';

@Controller('question')
@Public()

// @UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(
    private readonly QuestionService: QuestionService,
    private prisma: PrismaService,
  ) {}

  @Get()
  // @Roles('admin')
  getAllQuestion(@Query() query: GetQuestionDto) {
    return this.QuestionService.getquestion(query);
  }

  // @Public()
  // @Get('ADMISSIONFORMANDDATASHEET')
  // // @Roles('admin')
  // ADMISSIONFORMANDDATASHEET() {
  //   return this.QuestionService.ADMISSIONFORMANDDATASHEET();
  // }


  @Public()
  @Get('IndividualAbusePreventionPlan')
  // @Roles('admin')
  IndividualAbusePreventionPlan() {
    return this.QuestionService.IndividualAbusePreventionPlan();
  }


   @Public()
  @Get('SELFMANAGEMENTASSESSMENT')
  // @Roles('admin')
  SELFMANAGEMENTASSESSMENT() {
    return this.QuestionService.SELFMANAGEMENTASSESSMENT();
  }

    @Public()
  @Get('AllPartOfFormListAndKey')
  
  // @Roles('admin')
  AllPartOfFormListAndKey(
     @Res() response: Response,
  ) {
    return this.QuestionService.AllPartOfFormListAndKey(response);
  }

  @Post()
  // @Roles('admin')
  async demiQuestion(
    @Body() createQuestionDto: any,
    @Res() response: Response,
  ) {
    try {
      const newQuestions =
        await this.QuestionService.insertMultipleQuestions(response);
      console.log(newQuestions);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('form')
  // @Roles('admin')
  async demiform(@Body() createQuestionDto: any, @Res() response: Response) {
    try {
      const newQuestions =
        await this.QuestionService.insertMultipleForm(response);
      console.log(newQuestions);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('fifty')
  // @Roles('admin')
  async last50Records(
    @Body() createQuestionDto: any,
    @Res() response: Response,
  ) {
    try {
      const newQuestions =
        await this.QuestionService.lastFiftyRecords(response);
      console.log(newQuestions);
    } catch (error) {
      console.log(error);
    }
  }

  // @Post()
  // @Roles('admin')
  // createQuestion(
  //   @Body() createQuestionDto: CreateQuestionDto,
  //   @Res() response: Response,
  // ) {
  //   return this.QuestionService.create(createQuestionDto, response);
  // }

  @Get(':id')
  @Roles('admin')
  getQuestion(@Param('id') id: string, @Res() response: Response) {
    return this.QuestionService.getquestionById(id, response);
  }

  // @Put(':id')
  // @Roles('admin')
  // updateQuestion(
  //   @Param('id') id: string,
  //   @Body() updateQuestionDto: UpdateQuestionDto,
  //   @Res() response: Response,
  // ) {
  //   return this.QuestionService.update(id, updateQuestionDto, response);
  // }

  // @Delete(':id')
  // @Roles('admin')
  // removeQuestion(@Param('id') id: string, @Res() response: Response) {
  //   return this.QuestionService.remove(id, response);
  // }
}
