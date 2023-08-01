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
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerDto } from 'src/dto/customer.dto';
import { CustomerService } from 'src/services/customer.service';
import { BasicController } from 'src/interfaces/controller.interface';

@Controller('customers')
export class CustomerController implements BasicController {
  constructor(private readonly customerService: CustomerService) {}

  // GetCustomers with optional query
  @Get()
  findAll(@Query('name') name: string) {
    try {
      return this.customerService.getCustomers(name);
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  //Get One Customer
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.customerService.getOneCustomer(id);
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  // Create a Customer
  @Post()
  createCustomer(@Body(new ValidationPipe()) newCustomer: CustomerDto) {
    try {
      return this.customerService.createCustomer(newCustomer);
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  //Update Customer Info
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateCustomer: CustomerDto,
  ) {
    try {
      return this.customerService.updateCustomer(id, updateCustomer);
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  //Delete a customer
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.customerService.deleteCustomer(id);
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }
}
