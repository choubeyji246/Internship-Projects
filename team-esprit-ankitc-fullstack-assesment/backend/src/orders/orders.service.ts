import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CustomError } from 'src/utils/response';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async findAllByOrderId(params, authenticatedUser) {
    try {
      const { page, sortBy, sortOrder, filters } = params;
      const skip = (page - 1) * 10;

      const options: FindManyOptions<Order> = {
        select: ['date', 'order_id', 'status', 'items'],
        skip,
        take: 10,
        order: {
          [sortBy]: sortOrder,
        },
        where: { user_id: authenticatedUser, ...filters },
      };

      
      const data = await this.orderRepository.find(options);

      // if (!data || data.length === 0) {
      //   throw new CustomError(404, 'not found');
      // }
      return data;
    } catch (error) {
      throw new CustomError(error.status || 500, error.message);
    }
  }

  async getOrderById(authenticatedUser, orderId) {
    let order = await this.orderRepository.find({
      select: [
        'items',
        'date',
        'quantities',
        'shippingAddress',
        'status',
        'order_id',
        'total_amount',
      ],
      where: { order_id: orderId, user_id: authenticatedUser },
    });

    const itemsData = order[0].items.split(',');
    let items: any = [];
    let productPrice = 0;

    for (let i of itemsData) {
      let data = await this.productRepository.find({
        select: ['product_name', 'price'],
        where: { product_id: i },
      });
      items.push(data[0]);

      productPrice = productPrice + data[0].price;
    }
    order[0].items = items;
    order[0].total_amount = productPrice;

    if (!order || order.length === 0) {
      throw new CustomError(404, 'Not found');
    }
    return order;
  }
}
