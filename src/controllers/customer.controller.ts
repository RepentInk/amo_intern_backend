import {
  Controller,
  NotFoundException,
  Query,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Customer } from 'src/dto/customer.dto';
import { CustomerService } from 'src/services/customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // GetCustomers with optional query
  @Get()
  getCustomers(@Query('name') name: string) {
    try {
      return this.customerService.getCustomers(name);
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  //Get One Customer
  @Get(':id')
  getOneCustomer(@Param('id') id: string) {
    try {
      return this.customerService.getOneCustomer(+id);
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  // Create a Customer
  @Post()
  createCustomer(@Body() newCustomer: Customer) {
    try {
      return this.customerService.createCustomer(newCustomer);
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  //Update Customer Info
  @Put(':id')
  updateCustomer(@Param('id') id: string, @Body() updateCustomer: Customer[]) {
    try {
      return this.customerService.updateCustomer(+id, updateCustomer);
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  //Delete a customer
  @Delete(':id')
  deleteCustomer(@Param('id') id: string) {
    try {
      return this.customerService.deleteCustomer(+id);
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }
}
