import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from 'src/dto/order.dto';
import { Order } from 'src/entities/order.entity';
import { OrderInterface } from 'src/interfaces/order.interface';
import { Repository } from 'typeorm';
import { ResponseHandlerService } from './responseHandler.service';
import { CustomerService } from './customer.service';
import { CustomerDto } from 'src/dto/customer.dto';

@Injectable()
export class OrderService implements OrderInterface {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
  private readonly responseHandlerService: ResponseHandlerService,
  private readonly customerService: CustomerService,
  ) { }

  async findAll(): Promise<OrderDto[]> {
    try {
      const order: any = await this.orderRepository.find();
      const successMessage = 'Successful';
      return this. responseHandlerService.successResponse(successMessage, order) 
    } catch (error) {
      console.log(error);
      throw this.responseHandlerService.errorResponse(error.message, error.status)
    }
  }

  async findOne(id: number): Promise<OrderDto> {
    try {
      const order: any = await this.orderRepository.findOne({ where: { id } });
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      const successMessage = 'Successful';
      return this.responseHandlerService.successResponse(successMessage, order);
    } catch (error) {
      console.log(error);
      throw this.responseHandlerService.errorResponse(error.message, error.status)
    }
  }

  async create(orderDto: OrderDto): Promise<OrderDto> {
    try {
      const newOrder = await this.orderRepository.create(orderDto);

        //retrieve customer id and use that to create the order
        const CustomerDto: CustomerDto = await this.customerService.findOne(orderDto.customer_id);

       //create order for the customer
       newOrder.customer = CustomerDto;
       const createOrder = await this.orderRepository.save(newOrder);

       const successMessage = 'Order created successfully';
       return this.responseHandlerService.successResponse(createOrder, successMessage);
    
    } catch (error) {
      console.log(error);
      throw this.responseHandlerService.errorResponse(error.message, error.status)
    }
  }

  async update(orderDto: OrderDto, id: number): Promise<OrderDto> {
    try {
      const order: any = await this.orderRepository.findOne({ where: { id } });

      if (!order) {
        throw new NotFoundException('Order not found');
      }
      const newOrder = this.orderRepository.merge(order, orderDto);
      const updatedOrder = this.orderRepository.save(newOrder);
      const successMessage = 'Order updated successfully';
      return this.responseHandlerService.successResponse(updatedOrder, successMessage)
    } catch (error) {
      console.log(error);
      throw this.responseHandlerService.errorResponse(error.message, error.status);
    }
  }

  async delete(id: number): Promise<OrderDto> {
    try {
      const order: any = await this.findOne(id);
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      const deletedOrder = await this.orderRepository.remove(order);
      const successMessage = 'Order deleted successfully';
      return this.responseHandlerService.successResponse(deletedOrder, successMessage);
    } catch (error) {
      console.log(error);
      throw this.responseHandlerService.errorResponse(error.message, error.status)
    }
  }

  // Chart data
  async OrderData(): Promise<{ year: number; month: number; count: number }[]> {
    try {
      const totalOrders: any = await this.orderRepository
        .createQueryBuilder('order')
        .select('YEAR(order.createdAt)', 'year')
        .addSelect('MONTH(order.createdAt)', 'month')
        .addSelect('COUNT(order.id)', 'count')
        .groupBy('year, month')
        .getRawMany();

      return totalOrders;
    } catch (error) {
      console.log(error);
    }
  }
}
