import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerDto } from 'src/dto/customer.dto';
import { Customer } from 'src/entities/customer.entity';
import { CustomerInterface } from 'src/interfaces/customer.interface';
import { Repository } from 'typeorm';
import { ResponseHandlerService } from './responseHandler.service';
const successResponse = 'Successful';

@Injectable()
export class CustomerService implements CustomerInterface {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private readonly responseHandlerService: ResponseHandlerService,
  ) {}

  async findAll(): Promise<CustomerDto[]> {
    try {
      const customers: any = await this.customerRepository.find({
        where: { deleted_at: null },
      });
      return this.responseHandlerService.successResponse(
        successResponse,
        customers,
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error,
      );
    }
  }

  async findOne(id: number): Promise<CustomerDto> {
    try {
      const customer: any = await this.customerRepository.findOne({
        where: { id },
      });
      if (customer.deleted_at !== null) {
        throw new NotFoundException('Customer not found');
      }
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }

      return this.responseHandlerService.successResponse(
        successResponse,
        customer,
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error,
      );
    }
  }

  async create(customerDto: CustomerDto): Promise<CustomerDto> {
    try {
      const customer: any = this.customerRepository.create(customerDto);
      const createdCustomer = await this.customerRepository.save(customer);
      return this.responseHandlerService.successResponse(
        successResponse,
        createdCustomer,
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error,
      );
    }
  }

  async update(customerDto: CustomerDto, id: number): Promise<CustomerDto> {
    try {
      const customer: any = await this.customerRepository.findOne({
        where: { id },
      });
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      if (customer.deleted_at !== null) {
        throw new NotFoundException('Customer not found');
      }
      this.customerRepository.merge(customer, customerDto);
      const updatedCustomer = await this.customerRepository.save(customer);
      return this.responseHandlerService.successResponse(
        successResponse,
        updatedCustomer,
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error,
      );
    }
  }

  async delete(id: number): Promise<CustomerDto> {
    try {
      const customer: any = await this.customerRepository.findOne({
        where: { id },
      });
      if (customer.deleted_at !== null) {
        throw new NotFoundException('Customer not found');
      }
      // Update the deleted_at timestamp
      customer.deleted_at = new Date();
      const deletedCustomer = await this.customerRepository.save(customer);
      return this.responseHandlerService.successResponse(
        successResponse,
        deletedCustomer,
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error,
      );
    }
  }
}
