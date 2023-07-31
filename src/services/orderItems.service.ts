import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemsDto } from 'src/dto/orderItems.dto';
import { OrderItems } from 'src/entities/orderItems.entity';
import { OrderItemsInterface } from 'src/interfaces/orderItems.interface';

@Injectable()
export class OrderItemService implements OrderItemsInterface {
  constructor(
    @InjectRepository(OrderItems)
    private orderItemsRepository: Repository<OrderItems>,
  ) {}

  async findAll(): Promise<OrderItemsDto[]> {
    try {
      return this.orderItemsRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number): Promise<OrderItemsDto> {
    try {
      const orderItem = await this.findOne(id);
      if (!orderItem) {
        throw new NotFoundException('OrderItem not found');
      }
      return orderItem;
    } catch (error) {
      console.log(error);
    }
  }

  async create(orderItemDto: OrderItemsDto): Promise<OrderItemsDto> {
    try {
      const newOrderItem = this.orderItemsRepository.create(orderItemDto);
      return this.orderItemsRepository.save(newOrderItem);
    } catch (error) {
      console.log(error);
    }
  }

  async update(
    orderItemDto: OrderItemsDto,
    id: number,
  ): Promise<OrderItemsDto> {
    try {
      const orderItem = await this.orderItemsRepository.findOneBy({ id });
      if (!orderItem) {
        throw new NotFoundException('Order Item not found!');
      }
      this.orderItemsRepository.merge(orderItem, orderItemDto);
      return this.orderItemsRepository.save(orderItem);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: number): Promise<OrderItemsDto> {
    try {
      const orderItem = await this.orderItemsRepository.findOneBy({ id });
      await this.orderItemsRepository.remove(orderItem);
      return orderItem;
    } catch (error) {
      console.log(error);
    }
  }
}
