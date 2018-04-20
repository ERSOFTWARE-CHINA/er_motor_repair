import { Order } from '../../order/order-domain/order.domain';
import { Production } from '../../production/domain/production.domain';
export class ProductionStockin {
    id: number;
    no: string;
    amount: number;
    date: Date;
    remark: string;
    unit: string;
    production_id: number;
    order_id: number;
    order: Order;
    production: Production;
    // 设置默认值
    constructor() { 
    }
}