import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from 'src/dto/order.dto';
import { Order } from 'src/entities/order.entity';
import { OrderInterface } from 'src/interfaces/order.interface';
import { Repository } from 'typeorm';
import { ResponseHandlerService } from './responseHandler.service';

@Injectable()
export class OrderService implements OrderInterface {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
  private readonly responseHandlerService: ResponseHandlerService,
  ) { }

  async findAll(): Promise<OrderDto[]> {
    try {
      const order: any = await this.orderRepository.find();
      const successMessage = 'Successful';
      return this. responseHandlerService.successResponse(successMessage, order) 
    } catch (error) {
      console.log(error);
      const errorMessage = 'Error getting orders';
      throw this.responseHandlerService.errorResponse(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
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
      const errorMessage = 'Error getting order';
      throw this.responseHandlerService.errorResponse(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async create(orderDto: OrderDto): Promise<OrderDto> {
    try {
      const newOrder: any = this.orderRepository.create(orderDto);
      const createOrder = await this.orderRepository.save(newOrder);
      const successMessage = 'Order created successfully';
      return this.responseHandlerService.successResponse(successMessage, createOrder);
    } catch (error) {
      console.log(error);
      const errorMessage = 'Error creating order';
      throw this.responseHandlerService.errorResponse(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(orderDto: OrderDto, id: number): Promise<OrderDto> {
    try {
      const order: any = await this.orderRepository.findOne({ where: { id } });

      if (!order) {
        throw new NotFoundException('Order not found');
      }
      this.orderRepository.merge(order, orderDto);
      const updatedOrder = this.orderRepository.save(order);
      const successMessage = 'Order updated successfully';
      return this.responseHandlerService.successResponse(updatedOrder, successMessage)
    } catch (error) {
      console.log(error);
      const errorMessage = 'Error updating order';
      throw this.responseHandlerService.errorResponse(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
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
      const errorMessage = 'Error deleting order';
      throw this.responseHandlerService.errorResponse(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
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
