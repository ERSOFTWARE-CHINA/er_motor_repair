import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Router } from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/debounceTime';

import { ReuseTabService,ReuseTabMatchMode } from '@delon/abc';

import { CarMessageService } from '../../carMessage/service/carMessage.service';
import { RepairInfoService } from '../../repair_info/service/repair_info.service';

@Component({
    selector: 'app-dashboard-v1',
    templateUrl: './v1.component.html'
})
export class DashboardV1Component implements OnInit {

    constructor(public msg: NzMessageService,
                private carMsgService: CarMessageService,
                private repairInfoService: RepairInfoService,
                private router: Router,
                private reuseTabService: ReuseTabService) { }

    //搜索框ngModel，用于后台多字段查询
    model: any = null;
    //每当在输入框输入时（keyup），向流中发送搜索model
    private searchModels = new Subject<any>();
    search(): void {
        this.searchModels.next(this.model);
    }
      
    page_size = [5, 10, 20]
    // 车辆信息
    q_car: any = {
        page_index: 1,
        page_size: 5,
        sort_field: "owner_name",
        sort_direction: "desc"
    };
    // 车辆记录总数
    total_car: number;
    // 车辆信息列表
    data_car: any[] = [];
    sortMap_car: any = {};

    loading_car = false;
    del_car = null;

    q_repair: any = {
        page_index: 1,
        page_size: 5,
        sort_field: "date",
        sort_direction: "desc"
    };
    // 记录总数
    total_repair: number;
    // 列表
    data_repair: any[] = [];

    loading_repair = false;

    sortMap_repair: any = {};
    del_repair = null;
    sub_title = ""

    ngOnInit() {
        this.reuseTabService.title ="首页"; 
        this.getCarMsg();
        this.getRepairInfo();
        this.searchModels.debounceTime(400)
                         .map(model => {this.q_car.oneKey = this.model;this.getCarMsg()}).subscribe();
    }

    // 路由复用时需要重新获取数据
    _onReuseInit(){
        this.getCarMsg();
        this.getRepairInfo();
    }

    getCarMsg(){
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

    clickOnRow(i){
        this.sub_title = "(车牌号为："+i.plate_num+" 的车辆)";
        this.q_repair.car_message_id = i.id;
        this.repairInfoService.carMessage = i;
        this.getRepairInfo();
    }

    pageChange_car_message(pi: number) {
        this.q_car.page_index = pi;
        this.getCarMsg();
    }

    pageChange_repair_info(pi: number) {
        this.q_repair.page_index = pi;
        this.getRepairInfo();
    }

    sort_car_message(field: string, value: any) {
        this.q_car.sort_field = field;
        if (value=="ascend") {this.q_car.sort_direction = "asc"}
        if (value=="descend") {this.q_car.sort_direction = "desc"}
        this.getCarMsg();
    }

    sort_repair_info(field: string, value: any) {
        this.q_repair.sort_field = field;
        if (value=="ascend") {this.q_repair.sort_direction = "asc"}
        if (value=="descend") {this.q_repair.sort_direction = "desc"}
        this.getRepairInfo();
    }

    add_car_message(){
        this.carMsgService.formOperation = 'create';
        this.carMsgService.isUpdate=false;
        this.router.navigateByUrl('/carMessage/form');
    }

    add_repair_info(){
      this.repairInfoService.formOperation = 'create';
      this.repairInfoService.isUpdate=false;
      this.router.navigateByUrl('/repair_info/form');
    }
}
