import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap } from 'rxjs/operators';

import { ProductionStockinService } from '../service/production_stockin.service';
import { OrderService } from '../../order/order-service/order.service';
import { ProductionService } from '../../production/service/production.service';

@Component({
    selector: 'production_stockin-list',
    templateUrl: './list.component.html'
})
export class ProductionStockinListComponent implements OnInit {

    q: any = {
        page_index: 1,
        page_size: 15,
        sort_field: "date",
        sort_direction: "desc",
        no: null,
        date: null,
        order_id: null,
        production_id: null
    };
    // 记录总数
    total: number;
    // 用户列表
    data: any[] = [];
    // 删除对象
    delObj = null;

    //订单列表
    orders: any[] = [];
    single_order: any = null;
    // 产品列表
    productions: any[] = [];
    single_production: any = null;

    loading = false;

    sortMap: any = {};

    constructor(
        private http: _HttpClient, 
        public msg: NzMessageService,
        private productionStockinService: ProductionStockinService,
        private productionService: ProductionService,
        private orderService: OrderService,
        private router: Router
        ) {}

    ngOnInit() {
        this.getData();
        this.getProcuctions();
        this.getOrders();
    }

    _onReuseInit() {
        this.getData();
    }

    getData() {
        this.formatForm()
        this.loading = true;
        this.productionStockinService.listOnePage(this.q)
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

    getProcuctions() {
        this.productionService.listAll()
            .then(resp => this.productions = resp.data)
            .catch((error) => {this.msg.error(error);})
    }

    getOrders() {
        this.orderService.listAll()
            .then(resp => this.orders = resp.data)
            .catch((error) => {this.msg.error(error);})
    }

    remove(obj) {
        this.confirmContent = "确定要删除产品入库信息: " + obj.no + " ?";
        this.modalVisible = true;
        this.delObj = obj;
    }

    delete() {
        this.productionStockinService.delete(this.delObj.id)
                         .then(resp => this.msg.success("产品入库单:" + resp.data.no + "已删除！")).then(resp => this.getData() )
                         .catch((error) => {this.msg.error(error); this.loading = false;})
    }

    add() {
        this.productionStockinService.formOperation = 'create';
        this.productionStockinService.isUpdate=false;
        this.router.navigateByUrl('/production_stockin/form');
    }

    update(id) {
        this.productionStockinService.formOperation='update';
        this.productionStockinService.initUpdate(id)
            .then(result => { this.productionStockinService.productionStockin = result.data;})
            .then(() => this.router.navigateByUrl('/production_stockin/form')).catch((error)=>
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
        if (this.q.order_id == null){delete this.q.order_id}
        if (this.q.production_id == null){delete this.q.production_id}
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