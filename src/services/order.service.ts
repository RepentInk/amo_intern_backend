import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from 'src/dto/order.dto';
import { Order } from 'src/entities/order.entity';
import { OrderInterface } from 'src/interfaces/order.interface';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService implements OrderInterface {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    try {
      const order = await this.orderRepository.find();
      return order;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number): Promise<Order> {
    try {
      const order = await this.orderRepository.findOneBy({ id });
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      return order;
    } catch (error) {
      console.log(error);
    }
  }

  async create(orderDto: OrderDto): Promise<Order> {
    try {
      const newOrder = this.orderRepository.create(orderDto);
      await this.orderRepository.save(newOrder);
      return newOrder;
    } catch (error) {
      console.log(error);
    }
  }

  async update(orderDto: OrderDto, id: number): Promise<Order> {
    try {
      const order = await this.orderRepository.findOneBy({ id });
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      this.orderRepository.merge(order, orderDto);
      return this.orderRepository.save(order);
    } catch (error) {
      console.log(error);
    }
  }
  async delete(id: number): Promise<Order> {
    try {
      const order = await this.findOne(id);
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      await this.orderRepository.remove(order);
      return order;
    } catch (error) {
      console.log(error);
    }
  }
}
