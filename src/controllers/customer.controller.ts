import { BasicController } from 'src/interfaces/controller.interface';
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
  ApiBody,
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
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Successfully retrieved the customer.',
    type: CustomerDto,
  })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  async findOne(@Param('id') id: number): Promise<CustomerDto> {
    return this.customerService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Customer created successfully.',
    type: CustomerDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    type: CustomerDto,
    description: 'Customer data to be created',
    required: true,
  })
  async create(@Body() customerDto: CustomerDto): Promise<CustomerDto> {
    return this.customerService.create(customerDto);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Customer updated successfully.',
    type: CustomerDto,
  })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    type: CustomerDto,
    description: 'Customer data to be updated',
    required: true,
  })
  async update(
    @Body() customerDto: CustomerDto,
    @Param('id') id: number,
  ): Promise<CustomerDto> {
    return this.customerService.update(customerDto, id);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Customer deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  async delete(@Param('id') id: number): Promise<CustomerDto> {
    return this.customerService.delete(id);
  }
}
