import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Order } from './order.entity';

@Schema()
export class OrderLine extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Order' })
    order: Order;

    @Prop()
    OrderNumber: string;

    @Prop()
    SKU: string;

    @Prop()
    qtyOrder: number;

    @Prop()
    unitPrice: number;

    @Prop()
    unitDiscount: number;

    @Prop()
    lineTotal: number;
}

export const OrderLineSchema = SchemaFactory.createForClass(OrderLine);
