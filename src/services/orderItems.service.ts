import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemsDto } from 'src/dto/orderItems.dto';
import { OrderItems } from 'src/entities/orderItems.entity';
import { OrderItemsInterface } from 'src/interfaces/orderItems.interface';
import { ResponseHandlerService } from './responseHandler.service';

@Injectable()
export class OrderItemService implements OrderItemsInterface {
  constructor(
    @InjectRepository(OrderItems)
    private orderItemsRepository: Repository<OrderItems>,
    private responseHandlerService: ResponseHandlerService,
  ) {}

  async findAll(): Promise<OrderItemsDto[]> {
    try {
      const orderItems: any = await this.orderItemsRepository.find();
      const successMessage = 'Successful';
      return this.responseHandlerService.successResponse(successMessage, orderItems)
    } catch (error) {
      throw this.responseHandlerService.errorResponse(error.message, error.status)
    }
  }

  async findOne(id: number): Promise<OrderItemsDto> {
    try {
      const orderItem = await this.orderItemsRepository.findOne({
        where: { id },
      });

      if (!orderItem) {
        throw new NotFoundException('Order item not found');
      }
      const successMessage = 'Error getting order item'
      return this.responseHandlerService.successResponse(orderItem, successMessage);
    } catch (error) {
      throw this.responseHandlerService.errorResponse(error.message, error.status);
    }
  }

  async create(orderItemDto: OrderItemsDto): Promise<OrderItemsDto> {
    try {
      const newOrderItem = this.orderItemsRepository.create(orderItemDto);
      const createdOrderItem = this.orderItemsRepository.save(newOrderItem);
      const successMessage = 'Order item created successfully';
      return this.responseHandlerService.successResponse(createdOrderItem, successMessage);
    } catch (error) {
      throw this.responseHandlerService.errorResponse(error.message, error.status);
    }
  }

  async update(
    orderItemDto: OrderItemsDto,
    id: number,
  ): Promise<OrderItemsDto> {
    try {
      const orderItem = await this.orderItemsRepository.findOne({
        where: { id },
      });

      if (!orderItem) {
        throw new NotFoundException('Order item not found!');
      }
      this.orderItemsRepository.merge(orderItem, orderItemDto);
      const updatedOrder = await this.orderItemsRepository.save(orderItem);
      const successMessage = 'Order item updated successfully';
      return this.responseHandlerService.successResponse(updatedOrder, successMessage)
    } catch (error) {
      throw this.responseHandlerService.errorResponse(error.message, error.status)
    }
  }

  async delete(id: number): Promise<OrderItemsDto> {
    try {
      const orderItem = await this.orderItemsRepository.findOne({
        where: { id },
      });
      const deletedOrderItem = await this.orderItemsRepository.remove(orderItem);
      const successMessage = 'Order item deleted successfully';
      return this.responseHandlerService.successResponse(deletedOrderItem, successMessage);
    } catch (error) {
      throw this.responseHandlerService.errorResponse(error.message, error.status);
    }
  }
}
