import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap } from 'rxjs/operators';

import { PurchaseService } from '../service/purchase.service';

@Component({
    selector: 'purchase-list',
    templateUrl: './list.component.html'
})
export class PurchaseListComponent implements OnInit {

    q: any = {
        page_index: 1,
        page_size: 15,
        sort_field: "date",
        sort_direction: "desc",
        pno: null,
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
        private purchaseSrv: PurchaseService,
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
        this.purchaseSrv.listOnePage(this.q)
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
        this.confirmContent = "确定要删除采购单: " + obj.pno + " ?";
        this.modalVisible = true;
        this.delObj = obj;
    }

    delete() {
        this.purchaseSrv.delete(this.delObj.id)
                         .then(resp => this.msg.success("采购单:" + resp.data.name + "已删除！")).then(resp => this.getData() )
                         .catch((error) => {this.msg.error(error); this.loading = false;})
    }

    add() {
        this.purchaseSrv.formOperation = 'create';
        this.purchaseSrv.isUpdate=false;
        this.router.navigateByUrl('/purchases/form');
    }

    update(id) {
        this.purchaseSrv.formOperation='update';
        this.purchaseSrv.initUpdate(id)
            .then(result => { this.purchaseSrv.purchase = result.data;})
            .then(() => this.router.navigateByUrl('/purchases/form')).catch((error)=>
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
        if ((this.q.pno == null)||(this.q.pno == "")){delete this.q.pno}
        if ((this.q.date == null)||(this.q.date == "")){delete this.q.date}
        if ((this.q.remark == null)||(this.q.remark == "")){delete this.q.remark}
    }

    reset() {
        this.q = {
            page_index: 1,
            page_size: 15,
            sort_field: "date",
            sort_direction: "desc",
            pno: null,
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