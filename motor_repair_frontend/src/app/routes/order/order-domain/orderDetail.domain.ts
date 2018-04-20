import { Production } from "../../production/domain/production.domain";

export class OrderDetail {
    id: number;
    price: number;
    amount: number;
    total_price: number;
    production: Production;
}