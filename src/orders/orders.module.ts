import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { OrderLine, OrderLineSchema } from './entities/orderlines.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Order.name,
                schema: OrderSchema,
            },
            {
                name: OrderLine.name,
                schema: OrderLineSchema,
            },
        ]),
    ],
    providers: [OrdersService],
    controllers: [OrdersController],
})
export class OrdersModule {}
