import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @EventPattern('order.create')
    async create(createOrderDto: CreateOrderDto) {
        console.log(createOrderDto);
        this.orderService.save(createOrderDto);
    }
}
