import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap } from 'rxjs/operators';

import { CarMessageService } from '../service/carMessage.service';
import { UserStatusPipe } from '../../../pipes/pipes'; 

@Component({
    selector: 'carMessage-list',
    templateUrl: './list.component.html'
})
export class CarMessageListComponent implements OnInit {

    q: any = {
        page_index: 1,
        page_size: 15,
        sort_field: "owner_name",
        sort_direction: "desc",
        owner_name: null,
        phone_num: null,
        // time_difference: null
    };
    // 记录总数
    total: number;
    // 车辆信息列表
    data: any[] = [];
    // 删除对象
    delObj = null;

    loading = false;

    sortMap: any = {};

    constructor(
        private http: _HttpClient, 
        public msg: NzMessageService,
        private carMessageService: CarMessageService,
        private router: Router
        ) {}

    ngOnInit() {
        this.getData();
    }

    _onReuseInit() {
        this.getData();
    }

    getData() {
        console.log(this.q)
        this.formatForm()
        this.loading = true;
        this.carMessageService.listOnePage(this.q)
                         .then(resp => {
                             if (resp.error) {
                                this.msg.error(resp.error);
                                this.loading = false;
                             } else {
                                this.data = resp.data;this.total = resp.total_entries; 
                                this.loading = false;
                             }
                         })
                         .catch((error) => {this.msg.error(error); this.loading = false;})
    }

    remove(obj) {
        this.confirmContent = "确定要删除车辆信息?";
        this.modalVisible = true;
        this.delObj = obj;
    }

    delete() {
        this.carMessageService.delete(this.delObj.id)
                         .then(resp => this.msg.success("车辆信息:" + resp.data.name + "已删除！")).then(resp => this.getData() )
                         .catch((error) => {this.msg.error(error); this.loading = false;})
    }

    add() {
        this.carMessageService.formOperation = 'create';
        this.carMessageService.isUpdate=false;
        this.router.navigateByUrl('/carMessage/form');
    }

    update(id) {
        this.carMessageService.formOperation='update';
        this.carMessageService.initUpdate(id)
            .then(result => { this.carMessageService.carMessage = result.data;})
            .then(() => this.router.navigateByUrl('/carMessage/form')).catch((error)=>
            this.msg.error(error)); 
    }


    disable(id) {
        this.carMessageService.disable(id)
            .then(resp => this.msg.success("车辆信息:" + resp.data.name + "已禁用！")).then(resp => this.getData() )
            .catch((error) => {this.msg.error(error); this.loading = false;})
    }

    sort(field: string, value: any) {
        this.q.sort_field = field;
        if (value=="ascend") {this.q.sort_direction = "asc"}
        if (value=="descend") {this.q.sort_direction = "desc"}
        this.getData();
    }

    pageChange(pi: number) {
        this.q.page_index = pi;
        this.getData();
    }

    formatForm() {
        if ((this.q.owner_name == null)||(this.q.owner_name == "")){delete this.q.owner_name}
        if ((this.q.phone_num == null)||(this.q.phone_num == "")){delete this.q.phone_num}
        if ((this.q.plate_num == null)||(this.q.plate_num == "")){delete this.q.plate_num}
        if ((this.q.car_brand == null)||(this.q.car_brand == "")){delete this.q.car_brand}
    }

    // 删除确认框相关
    confirmContent = ""
    modalVisible = false;

    showModal = () => {
        this.modalVisible = true;
    }

    handleOk = (e) => {
        this.modalVisible = false;
        this.delete();
    }

    handleCancel = (e) => {
        this.modalVisible = false;
    }
}