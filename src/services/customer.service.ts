import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerDto } from 'src/dto/customer.dto';
import { Customer } from 'src/entities/customer.entity';
import { CustomerInterface } from 'src/interfaces/customer.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService implements CustomerInterface {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<CustomerDto[]> {
    try {
      const customer: any = await this.customerRepository.find();
      return customer;
    } catch (error) {
      console.log(error);
      throw new Error('An error occurred while fetching users');
    }
  }

  async findOne(id: number): Promise<CustomerDto> {
    try {
      const customer: any = await this.customerRepository.findOne({
        where: { id },
      });
      if (!customer) {
        throw new NotFoundException('Categories not found');
      }

      return customer;
    } catch (error) {
      console.log(error);
    }
  }

  async create(customerDto: CustomerDto): Promise<CustomerDto> {
    try {
      const customer: any = this.customerRepository.create(customerDto);
      return await this.customerRepository.save(customer);
    } catch (error) {
      console.log(error);
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
      this.customerRepository.merge(customer, customerDto);
      return this.customerRepository.save(customer);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: number): Promise<CustomerDto> {
    try {
      const customer: any = await this.customerRepository.findOne({
        where: { id },
      });
      await this.customerRepository.remove(customer);
      return customer;
    } catch (error) {
      console.log(error);
    }
  }
}
