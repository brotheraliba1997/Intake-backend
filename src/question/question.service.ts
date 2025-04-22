import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';

import { paginate } from 'src/common/pagination/paginate';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionPaginator } from './dto/get-question.dto';
// import { questionPaginator, GetquestionDto } from './dto/get-question.dto';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async create(request: CreateQuestionDto, response): Promise<any> {
    const { text, inputType, options } = request;

    try {
      await this.prisma.question.create({
        data: {
          text,
          inputType,
          options: {
            create: options,
          },
        },
      });

      return response.status(200).send({
        status: 'success',
        message: 'question created successfully',
      });
    } catch (error) {
      if (error?.meta?.target == 'question_email_key') {
        return response.status(422).send({
          status: 'error',
          message: 'question already exists with this email',
        });
      } else if (error?.meta?.target == 'question_phone_key') {
        return response.status(422).send({
          status: 'error',
          message: 'question already exists with this phone',
        });
      } else {
        return response.status(422).send({
          status: 'error',
          message: 'Something went wrong while creating question',
          meta: error.message,
        });
      }
    }
  }

  async update(id: string, request: UpdateQuestionDto, response): Promise<any> {
    const { text, inputType, options } = request;
  
    try {
      // Check for existing record with the same text or inputType (depending on your logic)
      const existingRecord = await this.prisma.question.findFirst({
        where: {
          AND: [
            { text: text },
            { NOT: { id: id } }  // Ensure it's a different record
          ]
        },
      });
  
      if (existingRecord) {
        return response.status(409).send({
          status: 'error',
          message: 'A question with the same text already exists.',
        });
      }
  
      
      const question = await this.prisma.question.update({
        where: { id },
        data: {
          text,
          inputType,
          options: {
            deleteMany: {}, 
            create: options, 
          },
        },
      });
  
      return response.status(200).send({
        status: 'success',
        message: 'Question updated successfully',
        data: question,
      });
    } catch (error) {
      return response.status(422).send({
        status: 'error',
        message: 'Something went wrong while updating the question',
        meta: error.message,
      });
    }
  }
  

  async getquestionById(id: string, response): Promise<any> {
    try {
      const question = await this.prisma.question.findUnique({
        where: { id },
      });
      return response.status(200).send({
        data: question,
        status: 'success',
      });
    } catch (error) {
      console.log('err=>', error);
      return response.status(422).send({
        status: 'error',
        message: 'Something went wrong.',
        meta: error.message,
      });
    }
  }

  async getquestion({ limit = 30, page = 1, search }: any): Promise<any> {
    const parsedLimit = Number(limit) || 30;
    const parsedPage = Number(page) || 1;

    const skip = (parsedPage - 1) * parsedLimit;

    const where: any = {};

    if (search && search.trim()) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const [results, totalCount] = await Promise.all([
      this.prisma.question.findMany({
        where: {
          ...where,
        },
        skip,
        take: parsedLimit,
        include: {
          options: true
        }
      }),
      this.prisma.question.count({ where }),
    ]);

    // Generate the pagination URL
    const url = `/question?limit=${parsedLimit}&page=${parsedPage}`;

    return {
      data: results,
      ...paginate(totalCount, parsedPage, parsedLimit, results.length, url),
    };
  }

  async findOne(id: string) {
    return this.prisma.question.findUnique({
      where: { id },
    });
  }

  async remove(id: string, response) {
    try {
      const user = await this.prisma.question.findUnique({
        where: { id },
      });

      if (!user) {
        throw new BadRequestException('User not found.');
      }

      await this.prisma.question.delete({
        where: { id },
      });

      return response.status(200).send({
        status: 'success',
        message: `question with ID ${id} have been successfully deleted.`,
      });
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        message:
          error.message ||
          'An unexpected error occurred while deleting the question.',
      });
    }
  }
}
