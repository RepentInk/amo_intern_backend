import { Injectable } from '@nestjs/common';
import { CustomerDto } from 'src/dto/customer.dto';
import { CustomerInterface } from 'src/interfaces/customer.interface';

@Injectable()
export class CustomerService {
  update(
    id: number,
    CustomerDto: CustomerDto,
  ): CustomerDto | PromiseLike<CustomerDto> {
    throw new Error('Method not implemented.');
  }
  // Initial Customers Array
  private customers = [];

  //getCustomers class method  with optional query parameter
  getCustomers = (name?: string): CustomerInterface[] => {
    if (name) {
      return this.customers.filter((customer) => customer.name === name);
    }
    return this.customers;
  };

  //getOneCustomer returns a single field in the customers database/array or throws an error when no entry exists.
  getOneCustomer = (id: number): CustomerInterface => {
    const findCustomer = this.customers.find((customer) => customer.id == id);
    if (findCustomer) return findCustomer;
    else throw new Error(`Customer does not exist... Please register`);
  };

  //createCustomer creates a new entry of customer and returns the newly created customer
  createCustomer(newCustomerInfo: CustomerDto) {
    // find if customer exist
    const findCustomer = this.customers.find(
      (customer) => customer.email == newCustomerInfo.email,
    );
    if (!findCustomer) {
      const id = Math.floor(Math.random() * 10000000000000); //Auto assign id to customers
      const newCustomer = { id, ...newCustomerInfo };
      this.customers.push(newCustomer);
      return this.getOneCustomer(id);
    } else {
      throw new Error('Customer already exist!');
    }
  }

  //update customer by passing id and updated info
  updateCustomer(id: number, updateCustomer: CustomerDto) {
    this.customers = this.customers.map((customer) => {
      if (customer.id === id) {
        return { ...customer, ...updateCustomer };
      }
      return customer;
    });
    return this.getOneCustomer(id);
  }

  //delete a customer by id
  deleteCustomer(id: number) {
    this.customers = this.customers.filter((customer) => {
      return customer.id !== id;
    });
    return this.getCustomers();
  }
}
