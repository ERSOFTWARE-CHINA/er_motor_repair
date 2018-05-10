export class User {
    id: number;
    name: string;
    mobile: string;
    real_name: string;
    position: string;
    is_admin: boolean;
    actived: boolean;
    roles: any[];
    avatar :string;
    project_id: number;
    // 设置默认值
    constructor() { 
    }
}