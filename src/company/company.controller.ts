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
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { GetCompaniesDto } from './dto/get-companies.dto';
import { CurrentUser } from 'src/decorators/current-user.decorators';
import { Roles } from 'src/decorators/roles.decorators';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('companies')
@ApiBearerAuth()

// @UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('me')
  getMyCompany(@CurrentUser() user: any, @Res() response: Response) {
    const companyId = user.companyId;
    return this.companyService.getCompanyById(companyId, response);
  }

  @Put('me')
  @Roles('admin')
  updateMyCompany(
    @CurrentUser() user: any,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Res() response: Response,
  ) {
    const companyId = user.companyId;
    return this.companyService.update(companyId, updateCompanyDto, response);
  }

  @Post()
  @Roles('super_admin')
  createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
    @Res() response: Response,
  ) {
    return this.companyService.create(createCompanyDto, response);
  }

  @Get()
  // @Roles('super_admin')
  getAllCompanies(@Query() query: GetCompaniesDto) {
    return this.companyService.getCompanies(query);
  }

  @Get(':id')
  // @Roles('super_admin')
  getCompany(
    @Param('id') id: string,
    @Res() response: Response,
    @CurrentUser() user: any,
  ) {
    if (user?.companyId === id || user?.role === 'super_admin') {
      return this.companyService.getCompanyById(id, response);
    } else {
      throw new ForbiddenException(`Forbidden ${user.role}`);
    }
  }

  @Put(':id')
  @Roles('super_admin')
  updateCompany(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Res() response: Response,
  ) {
    return this.companyService.update(id, updateCompanyDto, response);
  }

  @Delete(':id')
  @Roles('super_admin')
  removeCompany(@Param('id') id: string, @Res() response: Response) {
    return this.companyService.remove(id, response);
  }
}
