import { BasicController } from 'src/interfaces/controller.interface';
import { CustomerInterface } from 'src/interfaces/customer.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { CustomerDto } from 'src/dto/customer.dto';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@Controller('customers')
@ApiTags('Customers')
export class CustomerController implements BasicController {

  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiOkResponse({
    description: 'Successfully retrieved all customers.',
    type: CustomerDto,
    isArray: true,
  })
  async findAll(): Promise<CustomerDto[]> {
    return this.customerService.getCustomers();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Successfully retrieved the customer.',
    type: CustomerDto,
  })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  async findOne(@Param('id') id: number): Promise<CustomerDto> {
    return this.customerService.getOneCustomer(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Customer created successfully.',
    type: CustomerDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() customerDto: CustomerDto): Promise<CustomerDto> {
    return this.customerService.createCustomer(customerDto);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Customer updated successfully.',
    type: CustomerDto,
  })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  async update(@Body() CustomerDto: CustomerDto, @Param('id') id: number): Promise<CustomerDto> {
    return this.customerService.update(id, CustomerDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Customer deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  async delete(@Param('id') id: number): Promise<CustomerDto> {
    return this.customerService.deleteCustomer(id);
  }
  
}
