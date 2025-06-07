import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';

import { paginate } from 'src/common/pagination/paginate';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionPaginator } from './dto/get-question.dto';
import { Prisma } from '@prisma/client';
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
    const questionData = [' wrong'];

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
                    // type: subQ.type,
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
      title: ' wrong',

      questions: ['worng'],
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
      const question = await this.prisma.form.findUnique({
        where: { id },

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
          SubQuestion: true,
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

  async ADMISSIONFORMANDDATASHEET() {
    console.log('chal raha hai');
    const formId = '6811022f1860b38942a32a92';
    const questions = [
      {
        title:
          '*This form is completed at service initiation and updated as needed. Dated signatures are obtained at initiation and with changes.',
        type: 'html',
      },

      {
        title: 'PERSONAL INFORMATION ',
        type: 'html',
        subQuestion: [
          {
            title: 'Name',
            type: 'text',
          },
          { title: 'Date of birth', type: 'date' },
          {
            title: 'Address:',
            type: 'text',
          },
          { title: 'Home telephone number: ', type: 'text' },
          {
            title: 'Cell phone number:  ',
            type: 'text',
          },

          {
            title: 'Email address:',
            type: 'text',
          },

          {
            title: 'Date of admission or re-admission:',
            type: 'text',
          },

          {
            title: 'Language(s) spoken:',
            type: 'text',
          },

          {
            title: 'Guardianship type (self, private, public): ',
            type: 'text',
          },

          {
            title: 'Religious preference: ',
            type: 'text',
          },

          {
            title: 'Marital status: ',
            type: 'text',
          },

          {
            title: 'Other:  ',
            type: 'text',
          },
        ],
      },

      {
        title: 'IDENTIFYING CHARACTERISTICS',
        type: 'html',
        subQuestion: [
          {
            title: 'Gender:',
            type: 'text',
          },

          {
            title: 'Race: ',
            type: 'text',
          },

          {
            title: 'Height:',
            type: 'text',
          },

          {
            title: 'Weight:',
            type: 'text',
          },

          {
            title: 'Hair color: ',
            type: 'text',
          },

          {
            title: 'Eye color: ',
            type: 'text',
          },

          {
            title: 'Distinguishing characteristics/identifying marks: ',
            type: 'text',
          },
        ],
      },

      {
        title: 'FINANCIAL INFORMATION',
        type: 'html',
        subQuestion: [
          {
            title: 'Social Security Number (SSN):',
            type: 'text',
          },

          {
            title: 'Medical Assistance Number: ',
            type: 'text',
          },

          {
            title: 'County of responsibility:',
            type: 'text',
          },

          {
            title: 'County of financial responsibility: ',
            type: 'text',
          },

          {
            title: 'Burial account number:  ',
            type: 'text',
          },
        ],
      },

      {
        title: 'MEDICAL INFORMATION',
        type: 'html',
        subQuestion: [
          {
            title: 'Diagnoses:',
            type: 'text',
          },

          {
            title: 'Allergies: ',
            type: 'text',
          },

          {
            title: 'Protocols (seizure, diabetic, etc.):',
            type: 'text',
          },

          {
            title:
              'Medical equipment, devices, or adaptive aides or technology used:  ',
            type: 'text',
          },

          {
            title: 'Specialized dietary needs:   ',
            type: 'text',
          },
        ],
      },

      {
        title: 'GENERAL CONTACT INFORMATION',
        type: 'html',
        subQuestion: [
          {
            title: 'Name:',
            type: 'text',
          },

          {
            title: 'Address and telephone numbers: ',
            type: 'text',
          },

          {
            title: 'Legal representative:',
            type: 'text',
          },

          {
            title: 'Authorized representative:',
            type: 'text',
          },

          {
            title: 'Primary emergency contact: ',
            type: 'text',
          },

          {
            title: 'Case manager:  ',
            type: 'text',
          },

          {
            title: 'Family member:   ',
            type: 'text',
          },

          {
            title: 'Other:  ',
            type: 'text',
          },

          {
            title: 'Financial worker:  ',
            type: 'text',
          },

          {
            title: 'Residential contact: ',
            type: 'text',
          },

          {
            title: 'Vocational contact:   ',
            type: 'text',
          },

          {
            title: 'Other service provider: ',
            type: 'text',
          },
        ],
      },

      {
        title: 'HEALTH-RELATED CONTACT INFORMATION',
        type: 'html',
        subQuestion: [
          {
            title: 'Name:',
            type: 'text',
          },

          {
            title: 'Address and telephone numbers: ',
            type: 'text',
          },

          {
            title: 'Primary health care professional: ',
            type: 'text',
          },

          {
            title: 'Psychiatrist:',
            type: 'text',
          },

          {
            title: 'Other mental health professional: ',
            type: 'text',
          },

          {
            title: 'Neurologist:  ',
            type: 'text',
          },

          {
            title: 'Dentist:    ',
            type: 'text',
          },

          {
            title: 'Optometrist/Ophthalmologist:  ',
            type: 'text',
          },

          {
            title: 'Audiologist:  ',
            type: 'text',
          },

          {
            title: 'Pharmacy:  ',
            type: 'text',
          },

          {
            title: 'Hospital of preference:',
            type: 'text',
          },

          {
            title: 'Other health professional:',
            type: 'text',
          },
        ],
      },
    ];
    try {
      // const promissResult = await Promise.all(
      //   questions.map(async (question, ind) => {
      //     console.log(question.type, 'question');
      //     const questionCreate = await this.prisma.question.create({
      //       data: {
      //         title: question.title,
      //         type: 'text',
      //         // SubQuestion: {
      //         //   create: question.subQuestion?.map((sq, index) => {
      //         //     console.log(sq.type, 'subQuestion');
      //         //     return {
      //         //       title: "hello",
      //         //       type: 'text',
      //         //       arrangement: index + 1,
      //         //     };
      //         //   }),
      //         // },
      //       },
      //     });

      //     const subquestionCreate = await this.prisma.question.createMany({
      //       data: question.subQuestion?.map((items, indx) => ({
      //         title: 'hello',
      //         type: 'text',
      //         // arrangement: indx + 1,
      //         questionId: questionCreate?.id,
      //       })),
      //     });

      //     const formQuestion = await this.prisma.formQuestion.create({
      //       data: {
      //         formId: formId,
      //         questionId: questionCreate?.id,
      //         arrangement: ind + 1,
      //       },
      //     });

      //     // ✅ Explicitly return something
      //     return {
      //       questionId: questionCreate.id,
      //       formQuestionId: formQuestion.id,
      //     };
      //   }),
      // );

      const promissResult = await Promise.all(
        questions.map(async (question, ind) => {
          const questionCreate = await this.prisma.question.create({
            data: {
              title: question.title,
              type: question.type as any,
              // type: 'html',
            },
          });

          // ✅ Replace createMany with Promise.all to support relations
          await Promise.all(
            question.subQuestion?.map(async (sub, index) => {
              return await this.prisma.subQuestion.create({
                data: {
                  title: sub.title ?? 'Untitled',
                  type: sub.type as any,
                  // type: 'text',

                  arrangement: index + 1,
                  questionId: questionCreate.id,
                },
              });
            }) ?? [],
          );

          const formQuestion = await this.prisma.formQuestion.create({
            data: {
              formId: formId,
              questionId: questionCreate.id,
              arrangement: ind + 1,
            },
          });

          return {
            questionId: questionCreate.id,
            formQuestionId: formQuestion.id,
          };
        }),
      );

      console.log(promissResult);

      console.log(promissResult, 'promissResult');
      return promissResult;
    } catch (err) {
      console.log(err, 'err');

      return err;
    }
  }

  async IndividualAbusePreventionPlan() {
    console.log('chal raha hai');
    const formId = '68110390a947763e84212cfb';

    const questions = [
      {
        title: 'Signature',
        type: 'html',
        subQuestion: [
          {
            title: 'Signature',
            type: 'Signature',
          },
          {
            title: 'title',
            type: 'text',
          },
          {
            title: 'Date',
            type: 'date',
          },
          {
            title: 'Name',
            type: 'text',
          },
        ],
      },
    ];

    try {
      const promissResult = await Promise.all(
        questions.map(async (question, ind) => {
          const questionCreate = await this.prisma.question.create({
            data: {
              title: question.title,
              type: question.type as any,
              // type: 'html',
            },
          });

          // ✅ Replace createMany with Promise.all to support relations
          await Promise.all(
            question.subQuestion?.map(async (sub, index) => {
              return await this.prisma.subQuestion.create({
                data: {
                  title: sub.title ?? 'Untitled',
                  type: sub.type as any,
                  // type: 'text',

                  arrangement: index + 1,
                  questionId: questionCreate.id,
                },
              });
            }) ?? [],
          );

          const formQuestion = await this.prisma.formQuestion.create({
            data: {
              formId: formId,
              questionId: questionCreate.id,
              arrangement: ind + 1,
            },
          });

          return {
            questionId: questionCreate.id,
            formQuestionId: formQuestion.id,
          };
        }),
      );

      console.log(promissResult);

      console.log(promissResult, 'promissResult');
      return promissResult;
    } catch (err) {
      console.log(err, 'err');

      return err;
    }
  }

  async SELFMANAGEMENTASSESSMENT() {
    console.log('chal raha hai');
    const formId = '68120d8a081cbb1f4e304240';

    // const questions = [
    //   {
    //     title: 'Name',
    //     type: 'text',
    //   },
    //   {
    //     title: 'Date of birth',
    //     type: 'date',
    //   },

    //   {
    //     title: 'Date of Self-Management Assessment development:',
    //     type: 'text',
    //   },

    //   {
    //     title: 'For the annual period from:',
    //     type: 'text',
    //   },

    //   {
    //     title: 'Name and title of person completing the review:',
    //     type: 'text',
    //   },

    //   {
    //     title:
    //       'Health and medical needs to maintain or improve physical, mental, and emotional well-being',
    //     type: 'table',

    //     coloum: [
    //       { title: 'Assessment area ' },
    //       { title: 'Is the person able to self-manage in this area?' },
    //       {
    //         title:
    //           'Assessment - include information about the person that is descriptive of their overall strengths, functional skills and abilities, and behaviors or symptoms ',
    //       },
    //     ],

    //     subQuestion: [
    //       {
    //         title: 'Allergies (state specific allergies): ',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No ',
    //           },
    //           {
    //             title: 'NA - there are no allergies',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Seizures (state specific seizure types):  ',
    //         type: 'checkbox',
    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No ',
    //           },
    //           {
    //             title: 'NA - there are no allergies',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Choking',
    //         type: 'checkbox',
    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No ',
    //           },
    //           {
    //             title: 'NA - there are no allergies',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Special dietary needs (state specific need):',
    //         type: 'checkbox',
    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },
    //           {
    //             title: 'NA – there are no special dietary needs ',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Chronic medical conditions (state condition): ',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },
    //           {
    //             title: 'NA - there are no chronic medical conditions ',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Self-administration of medication or treatment orders ',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Preventative screening ',
    //         type: 'checkbox',
    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Medical and dental appointments',
    //         type: 'checkbox',
    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },

    //           {
    //             title: '',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Other health and medical needs (state specific need):',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },

    //           {
    //             title: 'NA',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Other health and medical needs (state specific need):',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },

    //           {
    //             title: 'NA',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Other health and medical needs (state specific need):',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },

    //           {
    //             title: 'NA',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Other health and medical needs (state specific need):',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },

    //           {
    //             title: 'NA',
    //           },
    //         ],
    //       },
    //     ],
    //   },

    //   {
    //     title:
    //       'Personal safety to avoid injury or accident in the service setting',
    //     type: 'table',

    //     coloum: [
    //       { title: 'Assessment area ' },
    //       { title: 'Is the person able to self-manage in this area?' },
    //       {
    //         title:
    //           'Assessment - include information about the person that is descriptive of their overall strengths, functional skills and abilities, and behaviors or symptoms ',
    //       },
    //     ],

    //     subQuestion: [
    //       {
    //         title: 'Risk of falling (include the specific risk): ',
    //         type: 'checkbox',
    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No ',
    //           },
    //           {
    //             title: 'NA - there are no allergies',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Mobility issues (include the specific issue): ',
    //         type: 'checkbox',
    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No ',
    //           },
    //           {
    //             title: 'NA - there are no allergies',
    //           },
    //         ],
    //       },

    //       {
    //         title: '',
    //         type: 'checkbox',
    //         options: [
    //           {
    //             title: 'NA - there are no allergies',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Regulating water temperature',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Community survival skills',
    //         type: 'checkbox',
    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Water safety skills ',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Sensory disabilities ',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },

    //           {
    //             title: 'NA',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Other personal safety needs (state specific need):',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },

    //           {
    //             title: 'NA',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Other personal safety needs (state specific need):',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },

    //           {
    //             title: 'NA',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Other personal safety needs (state specific need):',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },

    //           {
    //             title: 'NA',
    //           },
    //         ],
    //       },
    //     ],
    //   },

    //   {
    //     title:
    //       'Symptoms or behavior that may otherwise result in an incident as defined in section 245D.02, subd. 11 clauses (4) to (7) or suspension or termination of services by the license holder, or other symptoms or behaviors that may jeopardize the health and safety of the person or others.',
    //     type: 'table',

    //     coloum: [
    //       { title: 'Assessment area ' },
    //       { title: 'Is the person able to self-manage in this area?' },
    //       {
    //         title:
    //           'Assessment - include information about the person that is descriptive of their overall strengths, functional skills and abilities, and behaviors or symptoms ',
    //       },
    //     ],

    //     subQuestion: [
    //       {
    //         title: 'Self-injurious behaviors (state behavior): ',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No ',
    //           },
    //           {
    //             title: 'NA - there are no allergies',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Physical aggression/conduct (state behavior):  ',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No ',
    //           },
    //           {
    //             title: 'NA - there are no allergies',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Verbal/emotional aggression (state behavior):',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'NA - there are no allergies',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Property destruction (state behavior):',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Suicidal ideations, thoughts, or attempts',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Criminal or unlawful behavior',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Sensory disabilities ',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },

    //           {
    //             title: 'NA',
    //           },
    //         ],
    //       },

    //       {
    //         title:
    //           'Mental or emotional health symptoms and crises (state diagnosis): ',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },

    //           {
    //             title: 'NA',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Unauthorized or unexplained absence from a program',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },

    //           {
    //             title: 'NA',
    //           },
    //         ],
    //       },

    //       {
    //         title:
    //           'An act or situation involving a person that requires the program to call 911, law enforcement or fire department',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },

    //           {
    //             title: 'NA',
    //           },
    //         ],
    //       },

    //       {
    //         title: 'Other symptom or behavior (be specific): ',
    //         type: 'checkbox',

    //         options: [
    //           {
    //             title: 'Yes',
    //           },

    //           {
    //             title: 'No',
    //           },

    //           {
    //             title: 'NA',
    //           },
    //         ],
    //       },
    //     ],
    //   },

    //   {
    //     title: 'SIGNATURE PAGE',
    //     type: 'Signature',

    //     subQuestion: [
    //       {
    //         title:
    //           'By signing below, I am indicating the completion and approval of the Self-Management Assessment.',
    //         options: [
    //           {
    //             title: 'Person served:',
    //             type: 'text',
    //           },

    //           {
    //             title: 'Date ',
    //             type: 'date',
    //           },

    //           {
    //             title: 'Legal representative:',
    //             type: 'text',
    //           },

    //           {
    //             title: 'Date ',
    //             type: 'date',
    //           },

    //           {
    //             title: 'Case manager:',
    //             type: 'text',
    //           },

    //           {
    //             title: 'Date ',
    //             type: 'date',
    //           },

    //           {
    //             title: 'Licensed provider contact:',
    //             type: 'text',
    //           },

    //           {
    //             title: 'Date  ',
    //             type: 'date',
    //           },

    //           {
    //             title: 'Other support team member (name and title):',
    //             type: 'text',
    //           },

    //           {
    //             title: 'Date ',
    //             type: 'date',
    //           },

    //           {
    //             title: 'Other support team member (name and title):',
    //             type: 'text',
    //           },

    //           {
    //             title: 'Date  ',
    //             type: 'date',
    //           },
    //         ],
    //       },
    //     ],
    //   },

    //   {

    //     title:
    //       '<b> Please note: </b> <p> Within 20 working days of the 45-day planning meeting (and within 10 working days of the service plan review meeting), the assessment and this addendum must be submitted to and dated signatures obtained dated by the person served and/or legal representative and case manager to document completion and approval. If within 10 working days of this submission, the person served and/or legal representative or case manager has not signed and returned to the license holder the assessment and Support Plan Addendum or has not proposed written modification to its submission, the submission is deemed approved and in effect. It will remain in effect until the next annual month or until the person served and/or legal representative or case manager submits a written request to revise them. </p><ul> <li>I may refuse to authorize the company to administer medication or treatment and that the company will not administer the medication</li></ul>',
    //     type: 'html',
    //   },

    //   {

    //     title:
    //       'Within the scope of services to this person, the license holder must assess, at a minimum, the areas included on this document. Additional information on self-management may be included per request of the person served and/or legal representative and case manager. The Self-Management Assessment will be completed by the company’s designated staff person and will be done in consultation with the person and members of the support team.  <br> </br> The license holder will complete this assessment before the 45-day planning meeting and review it at the meeting. Within 20 working days of the 45-day meeting, dated signatures will be obtained from the person and/or legal representative and case manager to document the completion and approval of the Self-Management Assessment. At a minimum of annually, or within 30 days of a written request from the person and/or legal representative or case manager. This Self-Management Assessment will be reviewed by the support team or expanded support team as part of a service plan review and dated signatures obtained.  <br> </br>  Assessments must be based on the person’s status within the last 12 months at the time of service initiation. Assessments based on older information must be documented and justified. <br> </br>  The general and health-specific supports and outcomes necessary or desired to support the person based upon this assessment and the requirements of person centered planning and service delivery will be documented in the Support Plan Addendum.',
    //     type: 'html',
    //   },
    // ];

    const questions = [
      {
        title:
          'By signing below, I am indicating the completion and approval of the Self-Management Assessment.',
        type: 'html',
        subQuestion: [
          {
            title: 'Person served:',
            type: 'Signature',
          },
          {
            title: 'Date',
            type: 'date',
          },
          {
            title: 'Legal representative:',
            type: 'Signature',
          },
          {
            title: 'Date',
            type: 'date',
          },

          {
            title: 'Case manager:',
            type: 'Signature',
          },

          {
            title: 'Date',
            type: 'date',
          },

          {
            title: 'Licensed provider contact:',
            type: 'Signature',
          },

          {
            title: 'Date',
            type: 'date',
          },

          {
            title: 'Other support team member (name and title):',
            type: 'Signature',
          },

          {
            title: 'Date',
            type: 'date',
          },

          {
            title: 'Other support team member (name and title):',
            type: 'Signature',
          },

          {
            title: 'Date',
            type: 'date',
          },
        ],
      },
    ];

    try {
      const promissResult = await Promise.all(
        questions.map(async (question, ind) => {
          const questionCreate = await this.prisma.question.create({
            data: {
              title: question.title,
              type: question.type as any,
              // type: 'html',
            },
          });

          // await Promise.all(
          //   question.coloum?.map(async (sub, index) => {
          //     return await this.prisma.coloum.create({
          //       data: {
          //         title: sub.title ?? 'Untitled',
          //         questionId: questionCreate.id,
          //         arrangement: index + 1,
          //       },
          //     });
          //   }) ?? [],
          // );

          // ✅ Replace createMany with Promise.all to support relations
          await Promise.all(
            question.subQuestion?.map(async (sub, index) => {
              const subquestion = await this.prisma.subQuestion.create({
                data: {
                  title: sub.title ?? 'Untitled',
                  type: sub.type as any,
                  arrangement: index + 1,
                  questionId: questionCreate.id,
                },
              });

              // if (sub.options && sub.options.length > 0) {
              //   await Promise.all(
              //     sub.options.map((opt) =>
              //       this.prisma.option.create({
              //         data: {
              //           title: opt.title ?? 'Untitled',
              //           type: opt.type as any,
              //           subQuestionId: subquestion.id,
              //           show: true
              //         },
              //       }),
              //     ),
              //   );
              // }

              return subquestion;
            }) ?? [],
          );

          const formQuestion = await this.prisma.formQuestion.create({
            data: {
              formId: formId,
              questionId: questionCreate.id,
              arrangement: ind + 1,
            },
          });

          return {
            questionId: questionCreate.id,
            formQuestionId: formQuestion.id,
          };
        }),
      );

      console.log(promissResult);

      console.log(promissResult, 'promissResult');
      return promissResult;
    } catch (err) {
      console.log(err, 'err');

      return err;
    }
  }

  async AllPartOfFormListAndKey(response) {
    const formData = {
      title: 'LIVING HOPE REFERAL FORM',
      formQuestions: [
        {
          question: {
            title: 'Date of Referral:',
            type: 'date',
          },
        },

        {
          question: {
            title: 'Client ID #',
            type: 'number',
          },
        },

        {
          question: {
            title: 'CLIENT INFORMATION',
            type: 'html',
            SubQuestion: [
              {
                title: 'Client’s last name:',
                type: 'text',
              },

              {
                title: 'First:',
                type: 'text',
              },

              {
                title: 'Middle:',
                type: 'text',
              },

              {
                title: 'Married/Single',
                type: 'radio',
                options: [
                  { title: 'Mr', show: true, type: 'radio' },
                  { title: 'Mrs', show: true, type: 'radio' },
                  { title: 'Miss', show: true, type: 'radio' },
                  { title: 'Ms', show: true, type: 'radio' },
                ],
              },

              {
                title: 'Marital status',
                type: 'radio',
                options: [
                  { title: 'Single', show: true, type: 'radio' },
                  { title: 'Married', show: true, type: 'radio' },
                  { title: 'Divorce', show: true, type: 'radio' },
                  { title: 'Separate', show: true, type: 'radio' },
                  { title: 'widow', show: true, type: 'radio' },
                ],
              },

              {
                title: 'Is this your legal name?',
                type: 'radio',
                options: [
                  { title: 'Yes', show: true, type: 'radio' },
                  { title: 'No', show: true, type: 'radio' },
                ],
              },

              {
                title: 'Ethnicity:',
                type: 'text',
              },

              {
                title: 'Birth date:',
                type: 'date',
              },
              {
                title: 'Age:',
                type: 'date',
              },

              {
                title: 'Gender:',
                type: 'radio',
                options: [
                  { title: 'M', show: true, type: 'radio' },
                  { title: 'F', show: true, type: 'radio' },
                ],
              },

              {
                title: 'Street address:',
                type: 'text',
              },

              {
                title: 'City:',
                type: 'text',
              },

              {
                title: 'State:',
                type: 'text',
              },

              {
                title: 'ZIP Code:',
                type: 'text',
              },

              {
                title: 'Home phone no.:',
                type: 'number',
              },

              {
                title: 'Cell phone no.:',
                type: 'number',
              },

              {
                title: 'Work phone no.:',
                type: 'number',
              },

              {
                title: 'Emergency Contact Name:',
                type: 'number',
              },

              {
                title: 'Relationship:',
                type: 'text',
              },

              {
                title: 'Emergency phone no.:',
                type: 'number',
              },

              {
                title: 'Diagnosis:',
                type: 'text',
              },

              {
                title: 'Medical Concerns:',
                type: 'text',
              },

              {
                title: 'Are you a smoker?',
                type: 'text',
              },

              {
                title: 'Do you have animals in the house?',
                type: 'radio',
                options: [
                  { title: 'Cat', show: true, type: 'radio' },
                  { title: 'Dog', show: true, type: 'radio' },
                  { title: 'Other:', show: true, type: 'radio' },
                ],
              },
            ],
          },
        },

        {
          question: {
            title: 'SPECIAL NEEDS',
            type: 'html',
            SubQuestion: [
              {
                title: 'Is there any known cultural consideration needs?',
                type: 'radio',

                options: [
                  { title: 'Yes', show: true, type: 'radio' },
                  { title: 'No', show: true, type: 'radio' },
                  { title: 'other', show: true, type: 'radio' },
                ],
              },

              {
                title:
                  'Is there any gender preference regarding the assigned staff?',
                type: 'radio',

                options: [
                  { title: 'Yes', show: true, type: 'radio' },
                  { title: 'No', show: true, type: 'radio' },
                  { title: 'other', show: true, type: 'radio' },
                ],
              },
            ],
          },
        },

        {
          question: {
            title: 'INSURANCE INFORMATION',
            type: 'html',
            SubQuestion: [
              {
                title:
                  'Insurance Provider: Prepaid Medical Assistant Payment (UCARE, HealthPartners, Medica, Blue Cross etc.):',
                type: 'html',
              },

              {
                title: 'Spend down?',
                type: 'radio',

                options: [
                  { title: 'Yes', show: true, type: 'radio' },
                  { title: 'No', show: true, type: 'radio' },
                ],
              },

              {
                title: 'if yes, has client agreed to pay the spend down',
                type: 'radio',

                options: [
                  { title: 'Yes', show: true, type: 'radio' },
                  { title: 'No', show: true, type: 'radio' },
                ],
              },

              {
                title: 'Insurance Provider:',
                type: 'radio',

                options: [
                  { title: 'UCARE', show: true, type: 'radio' },
                  { title: 'MEDICA', show: true, type: 'radio' },
                  { title: 'Health Partners', show: true, type: 'radio' },
                  {
                    title: 'Blue Cross Blue Shield',
                    show: true,
                    type: 'radio',
                  },
                  {
                    title: 'Metropolitan Health Plan',
                    show: true,
                    type: 'radio',
                  },
                  { title: 'Straight MA', show: true, type: 'radio' },
                  { title: 'Other:', show: true, type: 'radio' },
                ],
              },

              {
                title: 'MA Subscriber ID #:',
                type: 'number',
              },

              {
                title: 'Primary Insurance #',
                type: 'text',
              },

              {
                title: 'Group #:',
                type: 'text',
              },
            ],
          },
        },

        {
          question: {
            title: 'VOCATIONAL PROGRAM REFERRAL',
            type: 'html',
            SubQuestion: [
              {
                title: 'What services are you seeking?',
                type: 'radio',
                options: [
                  {
                    title: 'Employment Exploration Services (EES) ',
                    show: true,
                    type: 'radio',
                  },
                  {
                    title: 'Employment Development Services (EDS) ',
                    show: true,
                    type: 'radio',
                  },
                  {
                    title: 'Employment Support Services (ESS) ',
                    show: true,
                    type: 'radio',
                  },
                  {
                    title: 'Employment Exploration Services (EES) ',
                    show: true,
                    type: 'radio',
                  },
                  {
                    title: 'Employment Exploration Services (EES) ',
                    show: true,
                    type: 'radio',
                  },
                  {
                    title: 'Employment Exploration Services (EES) ',
                    show: true,
                    type: 'radio',
                  },
                ],
              },

              {
                title: 'Are you currently Employed?',
                type: 'text',
              },

              {
                title:
                  'Are you interested in looking for community employment?',
                type: 'text',
              },

              {
                title: 'Are you able to work unsupervised in the community?',
                type: 'text',
              },
            ],
          },
        },

        {
          question: {
            title: 'IN-HOME SUPPORT PROGRAM REFERRAL',
            type: 'html',
            SubQuestion: [
              {
                title: 'What services are you seeking?',
                type: 'radio',
                options: [
                  {
                    title:
                      'Individualized Home Supports with Family training) ',
                    show: true,
                    type: 'radio',
                  },
                  {
                    title:
                      'Individualized Home Supports with training Supported ',
                    show: true,
                    type: 'radio',
                  },
                  {
                    title: 'Individualized Home Supports ',
                    show: true,
                    type: 'radio',
                  },
                  {
                    title: 'Supported Living Services (SLS)) ',
                    show: true,
                    type: 'radio',
                  },
                ],
              },

              {
                title: 'Types of service Support/goals:',
                type: 'radio',
                options: [
                  {
                    title: 'Organization ',
                    show: true,
                    type: 'radio',
                  },
                  {
                    title: 'Budget planning ',
                    show: true,
                    type: 'radio',
                  },
                  {
                    title: 'Meal Planning ',
                    show: true,
                    type: 'radio',
                  },
                  {
                    title: 'Cooking ',
                    show: true,
                    type: 'radio',
                  },

                  {
                    title: 'Exercising ',
                    show: true,
                    type: 'radio',
                  },

                  {
                    title: 'Grocery shopping ',
                    show: true,
                    type: 'radio',
                  },

                  {
                    title: 'Other: ',
                    show: true,
                    type: 'radio',
                  },
                ],
              },

              {
                title: 'Do you have a risk for falling?',
                type: 'text',
              },
            ],
          },
        },

        {
          question: {
            title: 'OTHER SERVICE REFERRAL',
            type: 'html',
            SubQuestion: [
              {
                title: 'What services are you seeking?',
                type: 'radio',
                options: [
                  {
                    title: '24-hour Emergency assistance ',
                    show: true,
                    type: 'radio',
                  },
                  {
                    title: 'Adult Companion services',
                    show: true,
                    type: 'radio',
                  },
                  {
                    title: 'Homemaker ',
                    show: true,
                    type: 'radio',
                  },
                  {
                    title: 'Individual Community Living Support',
                    show: true,
                    type: 'radio',
                  },

                  {
                    title: 'Nigh supervision ',
                    show: true,
                    type: 'radio',
                  },

                  {
                    title: 'Respite, in home or out-of-home',
                    show: true,
                    type: 'radio',
                  },

                  {
                    title: 'Crisis Respite, in home or out-of-home',
                    show: true,
                    type: 'radio',
                  },

                  {
                    title: 'Positive Supports',
                    show: true,
                    type: 'radio',
                  },

                  {
                    title: 'Specialist services',
                    show: true,
                    type: 'radio',
                  },

                  {
                    title: 'Community Residential Setting (CRS)',
                    show: true,
                    type: 'radio',
                  },

                  {
                    title: 'Integrated Community Supports',
                    show: true,
                    type: 'radio',
                  },
                ],
              },

              {
                title: 'Do you have a risk for falling?',
                type: 'text',
              },
            ],
          },
        },

        {
          question: {
            title: 'REFERRAL SOURCE N/A',
            type: 'html',
            SubQuestion: [
              {
                title: 'Referring Worker’s Name:',
                type: 'text',
              },

              {
                title: 'County or Organization / Department:',
                type: 'text',
              },

              {
                title: 'Address:',
                type: 'text',
              },

              {
                title: 'City:',
                type: 'text',
              },

              {
                title: 'State: MN Zip:',
                type: 'number',
              },

              {
                title: 'Work Phone:',
                type: 'number',
              },

              {
                title: 'Fax Phone:',
                type: 'number',
              },

              {
                title: 'Email',
                type: 'email',
              },

              {
                title:
                  'Would you like to be updated on all assessment scheduling & treatment of services?',
                type: 'radio',
                options: [
                  {
                    title: 'Yes ',
                    show: true,
                    type: 'radio',
                  },

                  {
                    title: 'No ',
                    show: true,
                    type: 'radio',
                  },
                ],
              },
            ],
          },
        },

        {
          question: {
            title:
              'MENTAL HEALTH DIAGNOSIS (PREVIOUS, IF KNOWN) OR WRITE NAME OF DX',
            type: 'html',
            SubQuestion: [
              {
                title: 'Axis |',
                type: 'text',
              },

              {
                title: 'Axis ||',
                type: 'text',
              },

              {
                title: 'Axis |||',
                type: 'text',
              },
            ],
          },
        },

        {
          question: {
            title: `<p> Referrals and copies of documents can be mailed or faxed <p> 
        <p> to: Living Hope, LLC <p> 
        <p> 5400 Opportunity Court Dr STE 110 <p> 
        <p> Hopkins, MN 55343 <p> 
        <p> PH: (612)352-9139 FAX: (612)605-0062 <p> 
        `,
            type: 'html',
          },
        },
      ],
    };

    // Step 1: Create Form
    const newForm = await this.prisma.form.create({
      data: {
        title: formData.title,
      },
    });

    // Step 2: Create Questions + FormQuestions
    const insertPromises = formData.formQuestions.map(
      async (formQ, formQIndex) => {
        const question = formQ.question;

        // Step 2a: Process subQuestions and add arrangement index
        const subQuestionsWithArrangement = question.SubQuestion?.map(
          (subQ, subIndex) => ({
            title: subQ.title,
            type: subQ.type as any,
            arrangement: subIndex + 1,
            options: subQ.options
              ? {
                  create: subQ.options.map((opt) => ({
                    title: opt.title,
                    type: opt.type as any,
                    show: opt.show ?? false,
                  })),
                }
              : undefined,
          }),
        );

        // const formattedOptions = question.options?.map((opt) => ({
        //   title: opt.title,
        //   show: opt.show ?? false,
        //   type: opt.type as any, // ✅ type safe
        // }));

        // Step 2b: Create question
        const createdQuestion = await this.prisma.question.create({
          data: {
            title: question.title,
            type: question.type as any,
            // options: question.options
            //   ? { create: formattedOptions }
            //   : undefined,

            SubQuestion: subQuestionsWithArrangement
              ? { create: subQuestionsWithArrangement }
              : undefined,
          },
          include: {
            options: true,
            coloum: true,
            SubQuestion: {
              include: {
                options: true,
              },
            },
          },
        });

        // Step 2c: Create formQuestion with arrangement as index + 1
        const createdFormQuestion = await this.prisma.formQuestion.create({
          data: {
            formId: newForm.id,
            questionId: createdQuestion.id,
            // title: formQ.title,
            // type: formQ.type,
            arrangement: formQIndex + 1,
          },
          include: {
            question: {
              include: {
                options: true,
                coloum: true,
                SubQuestion: {
                  include: {
                    options: true,
                  },
                },
              },
            },
          },
        });

        return createdFormQuestion;
      },
    );

    const finalFormQuestions = await Promise.all(insertPromises);

    return response.status(200).send({
      status: 'success',
      data: {
        form: newForm,
        formQuestions: finalFormQuestions,
      },
    });
  }
}
