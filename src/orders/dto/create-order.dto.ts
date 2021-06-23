import { OrderLineDto } from './orderline.dto';

export class CreateOrderDto {
    orderNumber: string;
    orderDate: Date;
    orderBy: string;
    shippingAddress: string;
    discountTotal: number;
    orderTotal: number;
    paymentTotal: number;
    orderLines: OrderLineDto[];
}
