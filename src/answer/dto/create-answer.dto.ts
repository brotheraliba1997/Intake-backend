import { PickType } from '@nestjs/swagger';
import { AnswerDto } from '../entities/answer.entity';

export class CreateAnswerDto extends PickType(AnswerDto, [
  'formId',
  'answers',

 
]) {}
