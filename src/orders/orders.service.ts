import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { MongooseService } from '../common/mongoose.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrderLine } from './entities/orderlines.entity';

@Injectable()
export class OrdersService extends MongooseService {
    constructor(
        @InjectConnection() private readonly connection: Connection,
        @InjectModel(Order.name) private readonly orderModel: Model<Order>,
        @InjectModel(OrderLine.name)
        private readonly orderLineModel: Model<OrderLine>,
    ) {
        super(orderModel);
    }

    async save(createOrderDto: CreateOrderDto) {
        const session = await this.connection.startSession();
        session.startTransaction();

        let id = '';

        try {
            const newOrder = new this.orderModel(createOrderDto);
            await newOrder.save({ session });
            id = newOrder._id;

            console.log(id);
            for (let orderLine of createOrderDto.orderLines) {
                const newOrderLine = new this.orderLineModel(orderLine);
                newOrderLine.order = newOrder._id;
                newOrderLine.OrderNumber = newOrder.orderNumber;
                await newOrderLine.save({ session });
            }

            await session.commitTransaction();
        } catch (err) {
            await session.abortTransaction();
            console.log(err);
        } finally {
            session.endSession();
        }

        return this.findOne(id);

        // return this.orderLineModel.find({
        //     order: id,
        // } as FilterQuery<OrderLine>);
    }

    async findOne(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException(`Id ${id} invalid`);
        }

        const entity = await this.orderModel.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: 'orderlines',
                    localField: '_id',
                    foreignField: 'order',
                    as: 'orderLines',
                },
            },
        ]);

        if (entity.length === 0) {
            throw new NotFoundException(`Id ${id} not found`);
        }
        return entity;
    }
}
