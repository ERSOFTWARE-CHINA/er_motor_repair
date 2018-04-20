import { Detail } from './detail.domain';

export class Purchase {
    id: number;
    pno: string;
    price: number;
    date: Date;
    remark: string;
    order: any;
    details: Detail[];
    order_id: number;
}