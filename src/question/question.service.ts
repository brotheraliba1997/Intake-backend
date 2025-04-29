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

  // async create(request: CreateQuestionDto, response): Promise<any> {
  //   const { text, inputType, options } = request;

  //   try {
  //     await this.prisma.question.create({
  //       data: {
  //         text,
  //         inputType,
  //         options: {
  //           create: options,
  //         },
  //       },
  //     });

  //     return response.status(200).send({
  //       status: 'success',
  //       message: 'question created successfully',
  //     });
  //   } catch (error) {
  //     if (error?.meta?.target == 'question_email_key') {
  //       return response.status(422).send({
  //         status: 'error',
  //         message: 'question already exists with this email',
  //       });
  //     } else if (error?.meta?.target == 'question_phone_key') {
  //       return response.status(422).send({
  //         status: 'error',
  //         message: 'question already exists with this phone',
  //       });
  //     } else {
  //       return response.status(422).send({
  //         status: 'error',
  //         message: 'Something went wrong while creating question',
  //         meta: error.message,
  //       });
  //     }
  //   }
  // }

  // async update(id: string, request: UpdateQuestionDto, response): Promise<any> {
  //   const { text, inputType, options } = request;

  //   try {
  //     // Check for existing record with the same text or inputType (depending on your logic)
  //     const existingRecord = await this.prisma.question.findFirst({
  //       where: {
  //         AND: [
  //           { text: text },
  //           { NOT: { id: id } }  // Ensure it's a different record
  //         ]
  //       },
  //     });

  //     if (existingRecord) {
  //       return response.status(409).send({
  //         status: 'error',
  //         message: 'A question with the same text already exists.',
  //       });
  //     }

  //     const question = await this.prisma.question.update({
  //       where: { id },
  //       data: {
  //         text,
  //         inputType,
  //         options: {
  //           deleteMany: {},
  //           create: options,
  //         },
  //       },
  //     });

  //     return response.status(200).send({
  //       status: 'success',
  //       message: 'Question updated successfully',
  //       data: question,
  //     });
  //   } catch (error) {
  //     return response.status(422).send({
  //       status: 'error',
  //       message: 'Something went wrong while updating the question',
  //       meta: error.message,
  //     });
  //   }
  // }

  async insertMultipleQuestions(response) {
    const questionData = [
      {
        title: 'Name',
        type: 'text',
      },
      {
        title: 'Date of birth',
        type: 'date',
      },
      {
        title: 'Date of Self-Management Assessment development:',
        type: 'text',
      },
      {
        title: 'For the annual period from:',
        type: 'text',
      },
      {
        title: 'Name and title of person completing the review:',
        type: 'text',
      },
      {
        title:
          'Health and medical needs to maintain or improve physical, mental, and emotional well-being',
        type: 'table',
        coloum: [
          {
            title: 'Assessment area',
          },
          {
            title: 'Is the person able to self-manage in this area?',
          },
          {
            title:
              'Assessment - include information about the person that is descriptive of their overall strengths, functional skills and abilities, and behaviors or symptoms',
          },
        ],
        subQuestion: [
          {
            title: 'Allergies (state specific allergies):',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
              {
                title: 'NA - there are no allergies',
                show: true,
              },
            ],
          },
          {
            title: 'Seizures (state specific seizure types):',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
              {
                title: 'NA - there are no allergies',
                show: true,
              },
            ],
          },
          {
            title: 'Choking',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
              {
                title: 'NA - there are no allergies',
                show: true,
              },
            ],
          },
          {
            title: 'Special dietary needs (state specific need):',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
              {
                title: 'NA – there are no special dietary needs',
                show: true,
              },
            ],
          },
          {
            title: 'Chronic medical conditions (state condition):',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
              {
                title: 'NA - there are no chronic medical conditions',
                show: true,
              },
            ],
          },
          {
            title: 'Self-administration of medication or treatment orders',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
            ],
          },
          {
            title: 'Preventative screening',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
            ],
          },
          {
            title: 'Medical and dental appointments',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
              {
                title: '',
                show: true,
              },
            ],
          },
          {
            title: 'Other health and medical needs (state specific need):',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
              {
                title: 'NA',
                show: true,
              },
            ],
          },
        ],
      },
      {
        title:
          'Personal safety to avoid injury or accident in the service setting',
        type: 'table',
        coloum: [
          {
            title: 'Assessment area',
          },
          {
            title: 'Is the person able to self-manage in this area?',
          },
          {
            title:
              'Assessment - include information about the person that is descriptive of their overall strengths, functional skills and abilities, and behaviors or symptoms',
          },
        ],
        subQuestion: [
          {
            title: 'Risk of falling (include the specific risk):',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
              {
                title: 'NA - there are no allergies',
                show: true,
              },
            ],
          },
          {
            title: 'Mobility issues (include the specific issue):',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
              {
                title: 'NA - there are no allergies',
                show: true,
              },
            ],
          },
          {
            title: 'Regulating water temperature',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
            ],
          },
          {
            title: 'Community survival skills',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
            ],
          },
          {
            title: 'Water safety skills',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
            ],
          },
          {
            title: 'Sensory disabilities',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
              {
                title: 'NA',
                show: true,
              },
            ],
          },
        ],
      },
      {
        title:
          'Symptoms or behavior that may otherwise result in an incident as defined in section 245D.02, subd. 11 clauses (4) to (7) or suspension or termination of services by the license holder, or other symptoms or behaviors that may jeopardize the health and safety of the person or others.',
        type: 'table',
        coloum: [
          {
            title: 'Assessment area',
          },
          {
            title: 'Is the person able to self-manage in this area?',
          },
          {
            title:
              'Assessment - include information about the person that is descriptive of their overall strengths, functional skills and abilities, and behaviors or symptoms',
          },
        ],
        subQuestion: [
          {
            title: 'Self-injurious behaviors (state behavior):',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
              {
                title: 'NA - there are no allergies',
                show: true,
              },
            ],
          },
          {
            title: 'Physical aggression/conduct (state behavior):',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
              {
                title: 'NA - there are no allergies',
                show: true,
              },
            ],
          },
          {
            title: 'Verbal/emotional aggression (state behavior):',
            type: 'checkbox',
            options: [
              {
                title: 'NA - there are no allergies',
                show: true,
              },
            ],
          },
          {
            title: 'Property destruction (state behavior):',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
            ],
          },
          {
            title: 'Suicidal ideations, thoughts, or attempts',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
            ],
          },
          {
            title: 'Criminal or unlawful behavior',
            type: 'checkbox',
            options: [
              {
                title: 'Yes',
                show: true,
              },
              {
                title: 'No',
                show: true,
              },
            ],
          },
        ],
      },
      {
        title: 'SIGNATURE PAGE',
        type: 'Signature',
        subQuestion: [
          {
            title:
              'By signing below, I am indicating the completion and approval of the Self-Management Assessment.',
            options: [
              {
                title: 'Person served:',
                type: 'text',
              },
              {
                title: 'Date',
                type: 'date',
              },
              {
                title: 'Legal representative:',
                type: 'text',
              },
              {
                title: 'Date',
                type: 'date',
              },
              {
                title: 'Case manager:',
                type: 'text',
              },
              {
                title: 'Date',
                type: 'date',
              },
              {
                title: 'Licensed provider contact:',
                type: 'text',
              },
              {
                title: 'Date',
                type: 'date',
              },
              {
                title: 'Other support team member (name and title):',
                type: 'text',
              },
              {
                title: 'Date',
                type: 'date',
              },
            ],
          },
        ],
      },
      {
        title:
          '<b> Please note: </b> <p> Within 20 working days of the 45-day planning meeting... </p>',
        type: 'html',
      },
      {
        title:
          'Within the scope of services to this person, the license holder must assess, at a minimum, the areas included on this document.',
        type: 'html',
      },
    ];

    // Create a list of promises for each question insert operation
    const insertPromises = questionData?.map(async (question: any) => {
      console.log(question.options, 'question.options');
      if (question.option) {
        return this.prisma.question.create({
          data: {
            title: question.title,
            type: question.type,
            options: { create: question.options },
            SubQuestion: question.subQuestion
              ? { create: question.subQuestion }
              : undefined, 
            coloum: question.coloum ? { create: question.coloum } : undefined, // <-- Options bhi top pe nahi hain
          },
          include: {
            options: true,
          },
        });
      } else {
        return this.prisma.question.create({
          data: {
            title: question.title,
            type: question.type,
            coloum: question.coloum ? { create: question.coloum } : undefined,
            SubQuestion: question.subQuestion
              ? {
                  create: question.subQuestion.map((subQ: any) => ({
                    title: subQ.title,
                    type: subQ.type,
                    options: subQ.options
                      ? {
                          create: subQ.options.map((opt: any) => ({
                            title: opt.title,
                            show: opt.show ? opt.show : false,
                         
                          })),
                        }
                      : undefined,
                  })),
                }
              : undefined,
          },
          include: {
            SubQuestion: {
              include: {
                options: true, // ✅ Include nested options inside SubQuestion
              },
            },
            coloum: true, // optional, if you want to return them too
          },
        });
      }
    });

    const newQuestions = await Promise.all(insertPromises);
    return response.status(200).send({
      data: newQuestions,
      status: 'success',
    });
  }

  async lastFiftyRecords(response) {
    const last50Records = await this.prisma.question.findMany({
      orderBy: {
        id: 'desc',
      },
      take: 50,
    });

    try {
      // Promise.all to resolve all promises at once

      // Send the response back with the created form and questions
      return response.status(200).send({
        data: last50Records,
        status: 'success',
      });
    } catch (error) {
      console.error('Error inserting form data:', error);
      return response.status(500).send({
        status: 'error',
        message: 'Data insertion failed.',
      });
    }
  }

  async insertMultipleForm(response) {
    const formData = {
      title:
        'Residency Agreement Template for Foster Care and Supported Living Services (SLS) under the BI, CAC, CADI and DD waivers',

      questions: [
        {
          questionId: '6811092aef93121f40f8e145',
        },
        {
          questionId: '6811092aef93121f40f8e14c',
        },
        {
          questionId: '6811092aef93121f40f8e148',
        },
        {
          questionId: '6811092aef93121f40f8e149',
        },
        {
          questionId: '6811092aef93121f40f8e143',
        },
        {
          questionId: '6811092aef93121f40f8e146',
        },
        {
          questionId: '6811092aef93121f40f8e151',
        },
        {
          questionId: '6811092aef93121f40f8e147',
        },
        {
          questionId: '6811092aef93121f40f8e144',
        },
        {
          questionId: '6811092aef93121f40f8e14a',
        },
        {
          questionId: '6811092aef93121f40f8e14b',
        },
        {
          questionId: '6811092aef93121f40f8e15c',
        },
        {
          questionId: '6811092aef93121f40f8e14d',
        },
      ],
    };

    const title = formData.title;
    const newForm = await this.prisma.form.create({
      data: {
        title: title,
      },
    });

    const insertPromises = formData?.questions?.map(async (question: any) => {
      return this.prisma.formQuestion.create({
        data: {
          formId: newForm.id,
          questionId: question.questionId,
        },
        include: {
          question: true,
        },
      });
    });

    try {
      // Promise.all to resolve all promises at once
      const newFormQuestions = await Promise.all(insertPromises);

      // Send the response back with the created form and questions
      return response.status(200).send({
        data: newFormQuestions,
        status: 'success',
      });
    } catch (error) {
      console.error('Error inserting form data:', error);
      return response.status(500).send({
        status: 'error',
        message: 'Data insertion failed.',
      });
    }

    // const newQuestions = await Promise.all(insertPromises);
    // return response.status(200).send({
    //   data: newQuestions,
    //   status: 'success',
    // });
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
          options: true,
        },
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
