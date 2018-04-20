import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Router } from '@angular/router';
import { OrderService } from '../order-service/order.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
})
export class OrderListComponent implements OnInit {

    constructor(
        private http: _HttpClient,
        public msg: NzMessageService,
        private orderService: OrderService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getData();
    }

    _onReuseInit() {
        this.getData();
    }

    expandForm = false;
    loading = false;
    q: any = {
        page_index: 1,
        page_size: 15,
        sort_field: "date",
        sort_direction: "desc",
        pno: null,
        name: null,
        price:null,
        date: null,
        project: null
    };
    // 记录总数
    total: number;
     // 列表
     data: any[] = [];
     // 删除对象
     delObj = null;
 

    formatForm() {
        if ((this.q.pno == null)||(this.q.pno == "")){delete this.q.pno}
        if ((this.q.date == null)||(this.q.date == "")){delete this.q.date}
        if ((this.q.name == null)||(this.q.name == "")){delete this.q.name}
    }

    getData(){
        this.formatForm()
        this.loading = true;
        this.orderService.listOnePage(this.q)
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

    add() {
        this.orderService.formOperation = 'create';
        this.orderService.isUpdate=false;
        this.router.navigateByUrl('/orders/form');
    }

    update(id) {
        this.orderService.formOperation='update';
        this.orderService.initUpdate(id)
            .then(result => { this.orderService.order = result.data;})
            .then(() => this.router.navigateByUrl('/orders/form')).catch((error)=>
            this.msg.error(error)); 
    }

    remove(obj) {
        this.confirmContent = "确定要删除定单: " + obj.pno + " "+obj.name + " ?";
        this.modalVisible = true;
        this.delObj = obj;
    }

    delete() {
        this.orderService.delete(this.delObj.id)
                         .then(resp => this.msg.success("订单:" + resp.data.pno+" "+resp.data.name + "已删除！")).then(resp => this.getData() )
                         .catch((error) => {this.msg.error(error); this.loading = false;})
    }

    reset() {
        this.q = {
            page_index: 1,
            page_size: 15,
            sort_field: "date",
            sort_direction: "desc",
            pno: null,
            name: null,
            price:null,
            date: null,
            project: null
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
