import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CustomResponse } from 'src/utils/response';

@Controller('auth/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findOne(@Query() params, @Req() request) {
    const authenticatedUser = request['id'];

    const data = await this.ordersService.findAllByOrderId(
      params,
      authenticatedUser,
    );

    return new CustomResponse(200, {
      message: 'Data fetched successfull',
      data: data,
    });
  }

  @Get('/orderId')
  @UseGuards(AuthGuard)
  async findOrderById(@Query() params, @Req() request) {
    const authenticatedUser = request['id'];
    const data = await this.ordersService.getOrderById(
      authenticatedUser,
      params.order_id,
    );
    return new CustomResponse(200, {
      message: 'Data fetched successfull',
      data: data,
    });
  }
}
