import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/orders.dto';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import {AuthGuard} from 'src/auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';



@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() newOrderData: CreateOrderDto) {
    return this.orderService.addOrder(newOrderData);
  }
}