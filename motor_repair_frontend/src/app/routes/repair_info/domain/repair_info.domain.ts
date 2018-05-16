export class RepairInfo {
    id: number;
    no: string;
    type: string;
    // time_cost: number;
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
    parts_cost: PartsCost[];
    time_cost: TimeCost[];
    //工时费总计、配件配总计以及总计
    time_total: number;
    parts_total: number;
    total: number
}

export class PartsCost {
    name: string;
    amount: number;
    unit_price: number;
    total: number;
}

export class TimeCost {
    name: string;
    total: number;
}