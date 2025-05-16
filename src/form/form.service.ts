import { BadRequestException, Injectable } from '@nestjs/common';
// import { CreateQuestionDto } from './dto/create-question.dto';

import { paginate } from 'src/common/pagination/paginate';
// import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';

// import { QuestionPaginator } from './dto/get-question.dto';
// import { questionPaginator, GetquestionDto } from './dto/get-question.dto';

@Injectable()
export class FormService {
  constructor(private prisma: PrismaService) {}

  // async getForms({ limit = 30, page = 1, search }: any): Promise<any> {
  //   const parsedLimit = Number(limit) || 30;
  //   const parsedPage = Number(page) || 1;

  //   const skip = (parsedPage - 1) * parsedLimit;

  //   const where: any = {};

  //   if (search && search.trim()) {
  //     where.OR = [
  //       { title: { contains: search, not: null,mode: 'insensitive',  } },
  //       // { email: { contains: search } },
  //     ];
  //   }

  //   const [results, totalCount] = await Promise.all([
  //     this.prisma.form.findMany({
  //       where: {
  //         ...where,
  //       },
  //       skip,
  //       take: parsedLimit,
  //     }),
  //     this.prisma.form.count({ where }),
  //   ]);

  //   // Generate the pagination URL
  //   const url = `/form?limit=${parsedLimit}&page=${parsedPage}`;

  //   return {
  //     data: results,
  //     ...paginate(totalCount, parsedPage, parsedLimit, results.length, url),
  //   };
  // }

  async getOneForms(id: string): Promise<any> {
    const result = await this.prisma.form.findUnique({
      where: {
        id: id, // Is ID ke liye record fetch karo
      },
    });

    return result;
  }

  async getAllForms(id: string, response): Promise<any> {
    const result = await this.prisma.form.findMany({
      include: {
        formQuestions: {
          include: {
            question: {
              include: {
                options: true,
                SubQuestion: {
                  include: {
                    options: true,
                  },
                },
                coloum: true,
              },
            },
          },
        },
      },
    });
    try {
      return response.status(200).send({
        status: 'success',
        message: 'Company created successfully',
        data: result,
      });
    } catch (error) {
      return response.status(422).send({
        status: 'error',
        message: 'Something went wrong while creating account',
        meta: error.message,
      });
    }
  }
}
