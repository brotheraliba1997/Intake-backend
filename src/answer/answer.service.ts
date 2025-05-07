import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';

import { paginate } from 'src/common/pagination/paginate';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnswerPaginator, GetAnswerDto } from './dto/get-answer.dto';

@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}

  async create(request: CreateAnswerDto, response): Promise<any> {
    const { formId, answers } = request;

    console.log(answers, "answers")

    try {
      const answerPromiss = await this.prisma.answerSubmission.create({
        data: {
          formId: formId,
        },
      });

      console.log(answerPromiss, "answerPromiss")
      const insertPromises = answers?.map(async (answer: any) => {
        return this.prisma.answer.create({
          data: {
            // formId: newForm.id
            submissionId: answerPromiss.id,
            questionId: answer.questionId,
            value: answer.value,
            type: answer.type,

            multipleValues: {
              create: answer.multipleValues?.map((optionId) => ({
                OptionId: optionId,
              })),
            },
          },
          include: {
            question: true,
          },
        });
      });

      const newFormQuestions = await Promise.all(insertPromises);

      return response.status(200).send({
        status: 'success',
        message: 'Answer created successfully',
        data: newFormQuestions,
      });
    } catch (error) {
      if (error?.meta?.target === 'answer_email_key') {
        return response.status(422).send({
          status: 'error',
          message: 'Answer already exists with this email',
        });
      } else if (error?.meta?.target === 'answer_phone_key') {
        return response.status(422).send({
          status: 'error',
          message: 'Answer already exists with this phone',
        });
      } else {
        return response.status(422).send({
          status: 'error',
          message: 'Something went wrong while creating answer',
          meta: error.message,
        });
      }
    }
  }

  async update(id: string, request: UpdateAnswerDto, response): Promise<any> {
    // const { name, email, phone, address, description, zipCode, city } = request;
    // try {
    //   const existingRecord = await this.prisma.answer.findFirst({
    //     where: {
    //       id: { not: id },
    //       OR: [{ name: name }, { email: email }, { phone: phone }],
    //     },
    //   });
    //   // if (existingRecord) {
    //   //   let errors = [];
    //   //   // Check each field and push corresponding errors
    //   //   if (existingRecord.name === name) {
    //   //     errors.push(`The name "${name}" already exists.`);
    //   //   }
    //   //   if (existingRecord.email === email) {
    //   //     errors.push(`The email "${email}" already exists.`);
    //   //   }
    //   //   if (existingRecord.phone === phone) {
    //   //     errors.push(`The phone "${phone}" already exists.`);
    //   //   }
    //   //   let errorFound = `Validation failed: ${errors.join(', ')}`;
    //   //   return response.status(409).send({
    //   //     status: 'error',
    //   //     message: errorFound,
    //   //   });
    //   // }
    //   const answer = await this.prisma.answer.update({
    //     where: { id },
    //     data: {
    //       name,
    //       address,
    //       phone,
    //       email,
    //       description,
    //       zipCode,
    //       city,
    //     },
    //   });
    //   return response.status(200).send({
    //     status: 'success',
    //     message: 'answer updated successfully',
    //     data: answer,
    //   });
    // } catch (error) {
    //   return response.status(422).send({
    //     status: 'error',
    //     message: 'Something went wrong while creating account',
    //     meta: error.message,
    //   });
    // }
  }

  async getanswerById(id: string, response): Promise<any> {
    // try {
    //   const answer = await this.prisma.answer.findUnique({
    //     where: { id },
    //   });
    //   return response.status(200).send({
    //     data: answer,
    //     status: 'success',
    //   });
    // } catch (error) {
    //   console.log('err=>', error);
    //   return response.status(422).send({
    //     status: 'error',
    //     message: 'Something went wrong.',
    //     meta: error.message,
    //   });
    // }
  }

  // async getCompanies({
  //   limit = 30,
  //   page = 1,
  //   search,
  // }: GetAnswerDto): Promise<AnswerPaginator> {
  //   const parsedLimit = Number(limit) || 30;
  //   const parsedPage = Number(page) || 1;

  //   const skip = (parsedPage - 1) * parsedLimit;

  //   const where: any = {};

  //   if (search && search.trim()) {
  //     where.OR = [
  //       { name: { contains: search } },
  //       { email: { contains: search } },
  //     ];
  //   }

  //   // Fetch companies with selected fields and role name, and total count in parallel
  //   const [results, totalCount] = await Promise.all([
  //     this.prisma.answer.findMany({
  //       // where,
  //       where: {
  //         ...where, // Existing conditions for other fields
  //       },
  //       skip,
  //       take: parsedLimit,
  //       // select: {
  //       //   id: true,
  //       //   name: true,
  //       //   phone: true,
  //       //   email: true,
  //       // },
  //     }),
  //     this.prisma.answer.count({ where }),
  //   ]);

  //   // Generate the pagination URL
  //   const url = `/companies?limit=${parsedLimit}&page=${parsedPage}`;

  //   return {
  //     data: results,
  //     ...paginate(totalCount, parsedPage, parsedLimit, results.length, url),
  //   };
  // }

  async findOne(id: string) {
    return this.prisma.answer.findUnique({
      where: { id },
    });
  }

  async remove(id: string, response) {
    try {
      const user = await this.prisma.answer.findUnique({
        where: { id },
      });

      if (!user) {
        throw new BadRequestException('User not found.');
      }

      await this.prisma.answer.delete({
        where: { id },
      });

      return response.status(200).send({
        status: 'success',
        message: `answer with ID ${id} have been successfully deleted.`,
      });
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        message:
          error.message ||
          'An unexpected error occurred while deleting the answer.',
      });
    }
  }
}
