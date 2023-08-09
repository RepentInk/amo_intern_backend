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
  ApiParam,
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
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'id of the customer to be retrieved',
    example: 3,
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the customer.',
    type: CustomerDto,
  })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  async findOne(@Param('id') id: number): Promise<CustomerDto> {
    return this.customerService.findOne(id);
  }

  @Post()
  @ApiParam({
    name: 'name',
    type: 'string',
    required: true,
    description: 'name of the customer to be created',
    example: 'John Doe',
  })
  @ApiParam({
    name: 'phone_number',
    type: 'string',
    required: true,
    description: 'phone number of the customer to be created',
    example: '1234567890',
  })
  @ApiParam({
    name: 'gender',
    type: 'string',
    required: true,
    description: 'gender of the customer to be created',
    example: 'Male',
  })
  @ApiParam({
    name: 'email',
    type: 'string',
    required: true,
    description: 'email of the customer to be created',
    example: 'john.doe@example.com',
  })
  @ApiParam({
    name: 'organization',
    type: 'string',
    required: false,
    description: 'organization of the customer to be created',
    example: 'Ammo',
  })
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
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'id of the customer to be updated',
    example: 3,
  })
  @ApiParam({
    name: 'name',
    type: 'string',
    required: false,
    description: 'new name of the customer to be updated',
    example: 'Jonathan Doeson',
  })
  @ApiParam({
    name: 'phone_number',
    type: 'string',
    required: false,
    description: 'new phone number of the customer to be updated',
    example: '1234567890',
  })
  @ApiParam({
    name: 'gender',
    type: 'string',
    required: false,
    description: 'new gender of the customer to be updated',
    example: 'Male',
  })
  @ApiParam({
    name: 'email',
    type: 'string',
    required: false,
    description: 'new email of the customer to be updated',
    example: 'jonatan.doe@example.com',
  })
  @ApiParam({
    name: 'organization',
    type: 'string',
    required: false,
    description: 'new organization of the customer to be updated',
    example: 'Vidash School',
  })
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
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'id of the customer to be deleted',
    example: 3,
  })
  @ApiOkResponse({ description: 'Customer deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  async delete(@Param('id') id: number): Promise<CustomerDto> {
    return this.customerService.delete(id);
  }
}
