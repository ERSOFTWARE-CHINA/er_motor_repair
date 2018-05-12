export class RepairInfo {
    id: number;
    no: string;
    type: string;
    time_cost: number;
    consultant: string;
    entry_date: Date;
    return_date: Date;
    items: string;
    customer_comment: string;
    repairman_comment: string;
    advise: string;
    mileage: number;
    next_mileage: number;
    next_date: Date;
    agent: string;
    agent_mobile: string;
    status: string;
    parts_cost: PartsCost[]
}

export class PartsCost {
    name: string;
    amount: number;
    unit_price: number;
    total: number;
}