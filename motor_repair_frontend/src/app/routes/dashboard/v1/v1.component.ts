import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

import { CarMessageService } from '../../carMessage/service/carMessage.service';
import { RepairInfoService } from '../../repair_info/service/repair_info.service';

@Component({
    selector: 'app-dashboard-v1',
    templateUrl: './v1.component.html',
    providers: [CarMessageService, RepairInfoService]
})
export class DashboardV1Component implements OnInit {

    constructor(public msg: NzMessageService,
                private carMsgService: CarMessageService,
                private repairInfoService: RepairInfoService) { }

    currentPlateNumber = '';

    // 车辆信息
    q_car: any = {
        page_index: 1,
        page_size: 15,
        sort_field: "owner_name",
        sort_direction: "desc"
    };
    // 车辆记录总数
    total_car: number;
    // 车辆信息列表
    data_car: any[] = [];
    sortMap_car: any = {};

    loading_car = false;

    q_repair: any = {
        page_index: 1,
        page_size: 15,
        sort_field: "date",
        sort_direction: "desc"
    };
    // 记录总数
    total_repair: number;
    // 列表
    data_repair: any[] = [];

    loading_repair = false;

    sortMap_repair: any = {};
    sub_title = ""

    ngOnInit() {
        console.log("ngOnInit")
        this.getCarMsg();
        this.getRepairInfo();
    }

    getCarMsg(){
        console.log("getCarMsg")
        this.loading_car = true;
        this.carMsgService.listOnePage(this.q_car)
            .then(resp => {
                if (resp.error) {
                this.msg.error(resp.error);
                this.loading_car = false;
                } else {
                this.data_car = resp.data;this.total_car = resp.total_entries; 
                this.loading_car = false;
                }
            })
            .catch((error) => {this.msg.error(error); this.loading_car = false;})
    }

    getRepairInfo() {

        this.loading_repair = true;
        this.repairInfoService.listOnePage(this.q_repair)
                         .then(resp => {
                             if (resp.error) {
                                this.msg.error(resp.error);
                                this.loading_repair = false;
                             } else {
                                this.data_repair = resp.data;this.total_repair = resp.total_entries; 
                                this.loading_repair = false;
                             }
                         })
                         .catch((error) => {this.msg.error(error); this.loading_repair = false;})
    }

    show_info(i){
        this.sub_title = "车牌号为："+i.plate_num+" 的车辆"
        this.q_repair.car_message_id = i.id
        this.getRepairInfo()
    }
}
