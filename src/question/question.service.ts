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

  // async insertMultipleQuestions(response) {
  //   // const questionData =
  //   //   {
  //   //     title: 'ADMISSION FORM AND DATA SHEET',
  //   //     questions: [
  //   //       {
  //   //         title:
  //   //           'This form is completed at service initiation and updated as needed. Dated signatures are obtained at initiation and with changes.',
  //   //         type: 'html',
  //   //       },
  //   //       {
  //   //         title: 'PERSONAL INFORMATION',
  //   //         type: 'text',
  //   //         options: [
  //   //           { title: 'Name', show: true },
  //   //           { title: 'Date of birth', show: true },
  //   //           { title: 'Address:', show: true },
  //   //           { title: 'Home telephone number:', show: true },
  //   //           { title: 'Cell phone number:', show: true },
  //   //           { title: 'Email address:', show: true },
  //   //           { title: 'Date of admission or re-admission:', show: true },
  //   //           { title: 'Language(s) spoken:', show: true },
  //   //           {
  //   //             title: 'Guardianship type (self, private, public):',
  //   //             show: true,
  //   //           },
  //   //           { title: 'Religious preference:', show: true },
  //   //           { title: 'Marital status:', show: true },
  //   //           { title: 'Other:', show: true },
  //   //         ],
  //   //       },
  //   //       {
  //   //         title: 'IDENTIFYING CHARACTERISTICS',
  //   //         type: 'text',
  //   //         options: [
  //   //           { title: 'Gender:', show: true },
  //   //           { title: 'Race:', show: true },
  //   //           { title: 'Height:', show: true },
  //   //           { title: 'Weight:', show: true },
  //   //           { title: 'Hair color:', show: true },
  //   //           { title: 'Eye color:', show: true },
  //   //           {
  //   //             title: 'Distinguishing characteristics/identifying marks:',
  //   //             show: true,
  //   //           },
  //   //         ],
  //   //       },
  //   //       {
  //   //         title: 'FINANCIAL INFORMATION',
  //   //         type: 'text',
  //   //         options: [
  //   //           { title: 'Social Security Number (SSN):', show: true },
  //   //           { title: 'Medical Assistance Number:', show: true },
  //   //           { title: 'County of responsibility:', show: true },
  //   //           { title: 'County of financial responsibility:', show: true },
  //   //           { title: 'Burial account number:', show: true },
  //   //         ],
  //   //       },
  //   //       {
  //   //         title: 'MEDICAL INFORMATION',
  //   //         type: 'text',
  //   //         options: [
  //   //           { title: 'Diagnoses:', show: true },
  //   //           { title: 'Allergies:', show: true },
  //   //           { title: 'Protocols (seizure, diabetic, etc.):', show: true },
  //   //           {
  //   //             title:
  //   //               'Medical equipment, devices, or adaptive aides or technology used:',
  //   //             show: true,
  //   //           },
  //   //           { title: 'Specialized dietary needs:', show: true },
  //   //         ],
  //   //       },
  //   //       {
  //   //         title: 'GENERAL CONTACT INFORMATION',
  //   //         type: 'text',
  //   //         options: [
  //   //           { title: 'Name:', show: true },
  //   //           { title: 'Address and telephone numbers:', show: true },
  //   //           { title: 'Legal representative:', show: true },
  //   //           { title: 'Authorized representative:', show: true },
  //   //           { title: 'Primary emergency contact:', show: true },
  //   //           { title: 'Case manager:', show: true },
  //   //           { title: 'Family member:', show: true },
  //   //           { title: 'Other:', show: true },
  //   //           { title: 'Financial worker:', show: true },
  //   //           { title: 'Residential contact:', show: true },
  //   //           { title: 'Vocational contact:', show: true },
  //   //           { title: 'Other service provider:', show: true },
  //   //         ],
  //   //       },
  //   //       {
  //   //         title: 'HEALTH-RELATED CONTACT INFORMATION',
  //   //         type: 'text',
  //   //         options: [
  //   //           { title: 'Name:', show: true },
  //   //           { title: 'Address and telephone numbers:', show: true },
  //   //           { title: 'Primary health care professional:', show: true },
  //   //           { title: 'Psychiatrist:', show: true },
  //   //           { title: 'Other mental health professional:', show: true },
  //   //           { title: 'Neurologist:', show: true },
  //   //           { title: 'Dentist:', show: true },
  //   //           { title: 'Optometrist/Ophthalmologist:', show: true },
  //   //           { title: 'Audiologist:', show: true },
  //   //           { title: 'Pharmacy:', show: true },
  //   //           { title: 'Hospital of preference:', show: true },
  //   //           { title: 'Other health professional:', show: true },
  //   //         ],
  //   //       },
  //   //     ],
  //   //   };

  //   // Create a list of promises for each question insert operation
  //   const insertPromises = questionData?.questions.map(async (question: any) => {
  //     console.log(question.options, "question.options")
  //     return this.prisma.question.create({
  //       data: {
  //         title: question.title,
  //         type: question.type,
  //         options: question.options ? { create: question.options } : undefined, // <-- Options bhi top pe nahi hain

  //       },
  //       include: {
  //         options: true,
  //       },
  //     });
  //   });

  //   const newQuestions = await Promise.all(insertPromises);
  //   return response.status(200).send({
  //     data: newQuestions,
  //     status: 'success',
  //   });
  // }

  async insertMultipleForm(response) {
    const formData = {
      title: 'Admission',
      questions: [
        {
          questionId: '680fa0c86999fbdff7b9dc51',
          text: 'html',
        },
      ],
    };

    
    
    const title = formData.title
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
          text: question.text, 
          inputType: question.inputType, 
          options: question.options ? { create: question.options } : undefined, 
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
      console.error("Error inserting form data:", error);
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
