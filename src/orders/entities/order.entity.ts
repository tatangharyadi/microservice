import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
    @Prop()
    orderNumber: string;

    @Prop()
    orderDate: Date;

    @Prop()
    orderBy: string;

    @Prop()
    shippingAddress: string;

    @Prop()
    discountTotal: number;

    @Prop()
    orderTotal: number;

    @Prop()
    paymentTotal: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
