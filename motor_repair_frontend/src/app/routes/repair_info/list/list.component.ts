import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap } from 'rxjs/operators';

import { RepairInfoService } from '../service/repair_info.service';

@Component({
    selector: 'repair_info-list',
    templateUrl: './list.component.html'
})
export class RepairInfoListComponent implements OnInit {

    q: any = {
        page_index: 1,
        page_size: 15,
        sort_field: "date",
        sort_direction: "desc",
        no: null,
        date: null,
        remark: null,
        order: null
    };
    // 记录总数
    total: number;
    // 列表
    data: any[] = [];
    // 删除对象
    delObj = null;

    loading = false;

    sortMap: any = {};

    constructor(
        private http: _HttpClient, 
        public msg: NzMessageService,
        private mrSrv: RepairInfoService,
        private router: Router
        ) {}

    ngOnInit() {
        this.getData();
    }

    _onReuseInit() {
        this.getData();
    }

    getData() {
        this.formatForm()
        this.loading = true;
        this.mrSrv.listOnePage(this.q)
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
        this.confirmContent = "确定要删除领料单: " + obj.no + " ?";
        this.modalVisible = true;
        this.delObj = obj;
    }

    delete() {
        this.mrSrv.delete(this.delObj.id)
                         .then(resp => this.msg.success("领料单:" + resp.data.name + "已删除！")).then(resp => this.getData() )
                         .catch((error) => {this.msg.error(error); this.loading = false;})
    }

    add() {
        this.mrSrv.formOperation = 'create';
        this.mrSrv.isUpdate=false;
        this.router.navigateByUrl('/repair_info/form');
    }

    update(id) {
        this.mrSrv.formOperation='update';
        this.mrSrv.initUpdate(id)
            .then(result => { this.mrSrv.repairInfo = result.data;})
            .then(() => this.router.navigateByUrl('/repair_info/form')).catch((error)=>
            this.msg.error(error)); 
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
        if ((this.q.no == null)||(this.q.no == "")){delete this.q.no}
        if ((this.q.date == null)||(this.q.date == "")){delete this.q.date}
        if ((this.q.remark == null)||(this.q.remark == "")){delete this.q.remark}
    }

    reset() {
        this.q = {
            page_index: 1,
            page_size: 15,
            sort_field: "date",
            sort_direction: "desc",
            no: null,
            date: null,
            remark: null,
            order: null
        };
        this.getData()
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