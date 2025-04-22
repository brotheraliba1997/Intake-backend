import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';

import { paginate } from 'src/common/pagination/paginate';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyPaginator, GetCompaniesDto } from './dto/get-companies.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(request: CreateCompanyDto, response): Promise<any> {
    const { name, email, phone, address, state, city, zipCode, description } =
      request;

    try {
      await this.prisma.company.create({
        data: {
          name,
          email,
          phone,
          address,
          state,
          city,
          zipCode,
          description,
        },
      });

      return response.status(200).send({
        status: 'success',
        message: 'Company created successfully',
      });
    } catch (error) {
      if (error?.meta?.target == 'Company_email_key') {
        return response.status(422).send({
          status: 'error',
          message: 'Company already exists with this email',
        });
      } else if (error?.meta?.target == 'Company_phone_key') {
        return response.status(422).send({
          status: 'error',
          message: 'Company already exists with this phone',
        });
      } else {
        return response.status(422).send({
          status: 'error',
          message: 'Something went wrong while creating Company',
          meta: error.message,
        });
      }
    }
  }

  async update(id: string, request: UpdateCompanyDto, response): Promise<any> {
    const { name, email, phone, address, description, zipCode, city } = request;

    try {
      const existingRecord = await this.prisma.company.findFirst({
        where: {
          id: { not: id },
          OR: [{ name: name }, { email: email }, { phone: phone }],
        },
      });

      if (existingRecord) {
        let errors = [];

        // Check each field and push corresponding errors
        if (existingRecord.name === name) {
          errors.push(`The name "${name}" already exists.`);
        }
        if (existingRecord.email === email) {
          errors.push(`The email "${email}" already exists.`);
        }
        if (existingRecord.phone === phone) {
          errors.push(`The phone "${phone}" already exists.`);
        }
        let errorFound = `Validation failed: ${errors.join(', ')}`;

        return response.status(409).send({
          status: 'error',
          message: errorFound,
        });
      }

      const company = await this.prisma.company.update({
        where: { id },
        data: {
          name,
          address,
          phone,
          email,
          description,
          zipCode,
          city,
        },
      });

      return response.status(200).send({
        status: 'success',
        message: 'Company updated successfully',
        data: company,
      });
    } catch (error) {
      return response.status(422).send({
        status: 'error',
        message: 'Something went wrong while creating account',
        meta: error.message,
      });
    }
  }

  async getCompanyById(id: string, response): Promise<any> {
    try {
      const company = await this.prisma.company.findUnique({
        where: { id },
      });
      return response.status(200).send({
        data: company,
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

  async getCompanies({
    limit = 30,
    page = 1,
    search,
  }: GetCompaniesDto): Promise<CompanyPaginator> {
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

    // Fetch companies with selected fields and role name, and total count in parallel
    const [results, totalCount] = await Promise.all([
      this.prisma.company.findMany({
        // where,
        where: {
          ...where, // Existing conditions for other fields
        },
        skip,
        take: parsedLimit,
        // select: {
        //   id: true,
        //   name: true,
        //   phone: true,
        //   email: true,
        // },
      }),
      this.prisma.company.count({ where }),
    ]);

    // Generate the pagination URL
    const url = `/companies?limit=${parsedLimit}&page=${parsedPage}`;

    return {
      data: results,
      ...paginate(totalCount, parsedPage, parsedLimit, results.length, url),
    };
  }

  async findOne(id: string) {
    return this.prisma.company.findUnique({
      where: { id },
    });
  }

  async remove(id: string, response) {
    try {
      const user = await this.prisma.company.findUnique({
        where: { id },
      });

      if (!user) {
        throw new BadRequestException('User not found.');
      }

      await this.prisma.company.delete({
        where: { id },
      });

      return response.status(200).send({
        status: 'success',
        message: `company with ID ${id} have been successfully deleted.`,
      });
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        message:
          error.message ||
          'An unexpected error occurred while deleting the company.',
      });
    }
  }
}
