import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from 'src/dto/order.dto';
import { Order } from 'src/entities/order.entity';
import { OrderInterface } from 'src/interfaces/order.interface';
import { Repository } from 'typeorm';
import { ResponseHandlerService } from './responseHandler.service';
import { CustomerService } from './customer.service';
import { CustomerDto } from 'src/dto/customer.dto';
import { OrderItemService } from './orderItems.service';
import { Items } from 'src/entities/items.entity';
import { Customer } from 'src/entities/customer.entity';
import { CustomerOrdersDto } from 'src/dto/customerOrders.dto';
import { OrderItems } from 'src/entities/orderItems.entity';

@Injectable()
export class OrderService implements OrderInterface {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
  private readonly responseHandlerService: ResponseHandlerService,
  private readonly customerService: CustomerService,
  private readonly orderItemsService: OrderItemService,
  @InjectRepository(Items) private itemsRepository: Repository<Items>,
  @InjectRepository(Customer) private customerRepository: Repository<Customer>,
  @InjectRepository(OrderItems) private orderItemsRepository: Repository<OrderItems>,
  ) { }

  async findAll(): Promise<OrderDto[]> {
    try {
      const order: any = await this.orderRepository.find();
      const successMessage = 'Successful';
      return this. responseHandlerService.successResponse(successMessage, order) 
    } catch (error) {
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
      throw this.responseHandlerService.errorResponse(error.message, error.status)
    }
  }

  async create(orderDto: OrderDto): Promise<OrderDto> {
    try {

        //retrieve customer id and use that to create the order
        let customerId = orderDto.customer_id;
        let customer: CustomerDto = await this.customerService.findOne(orderDto.customer_id);

       //Check for customer id and create a customer if it does not exist
       if(!customer){
        const customer: any = this.customerRepository.create({
          name: orderDto.customer.name,
          email: orderDto.customer.email, 
          gender: orderDto.customer.gender, 
          phone_number: orderDto.customer.phone_number, 
          organization: orderDto.customer.organization
        });
        
         await this.customerRepository.save(customer);
         customerId = customer.id;
       }
       // create the order
       const newOrder = this.orderRepository.create({
        unique_number: orderDto.unique_number,
        order_code: orderDto.order_code,
        delivery_point: orderDto.delivery_point,
        payment: orderDto.payment,
        status: orderDto.status,
        amount_paid: orderDto.amount_paid,
        payment_mode: orderDto.payment_mode,
        order_channel: orderDto.order_channel,
       });
       newOrder.customer = customer;

       const createOrder = await this.orderRepository.save(newOrder);

       // Create  the order items
       const orderItems = [];
       for (const orderItem of orderItems) {
         const newOrderItem = this.orderItemsRepository.create({
           ...orderItem,
           order_id: createOrder.id,
         });
         const savedItem = await this.orderItemsRepository.save(newOrderItem);
         orderItems.push(savedItem);
       }
      
       // Subtract the ordered items from the items table
       for(const orderedItem of orderItems) {
           await this.itemsRepository.decrement({id: orderedItem.item_id}, 
            'quantity', orderedItem.quantity)
       }

       const successMessage = 'Order created successfully';
       return this.responseHandlerService.successResponse(createOrder, successMessage);
    
    } catch (error) {
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
      throw this.responseHandlerService.errorResponse(error.message, error.status);
    }
  }

  async delete(id: number): Promise<OrderDto> {
    try {
      const order: any = await this.orderRepository.findOne({ where: { id } });
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      const deletedOrder = await this.orderRepository.remove(order);
      const successMessage = 'Order deleted successfully';
      return this.responseHandlerService.successResponse(deletedOrder, successMessage);
    } catch (error) {
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
