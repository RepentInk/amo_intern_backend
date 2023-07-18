import { Controller, NotFoundException, Query, Get, Param, Post, Body } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}
  @Get()
  getCustomers(@Query('name') name: string) {
    try {
      return this.customerService.getCustomers(name);
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  @Get('id')
  getOneCustomer(@Param('id') id: number) {
    try {
      return this.customerService.getOneCustomer(id);
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  @Post()
  createCustomer(@Body() newCustomer: Customer) {
    try {
      return this.customerService.createCustomer(newCustomer);
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  
}
