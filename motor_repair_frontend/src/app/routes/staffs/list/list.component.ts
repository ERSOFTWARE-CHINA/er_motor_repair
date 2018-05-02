import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap } from 'rxjs/operators';

import { StaffStatusPipe } from '../../../pipes/pipes'; 
import { SexPipe } from '../../../pipes/pipes'; 
import { StaffsService } from '../service/staffs.service';
@Component({
    templateUrl: './list.component.html'
})
export class StaffListComponent implements OnInit {
    q: any = {
        page_index: 1,
        page_size: 15,
        sort_field: "name",
        sort_direction: "desc",
        name: null
    };
    // 记录总数
    total: number;
    // 角色列表
    data: any[] = [];
    // 删除对象
    delObj = null;

    loading = false;

    sortMap: any = {};

    sex_status = [
        { text: '', value: null },
        { text: '男', value: true },
        { text: '女', value: false }
    ]

    actived_status = [
        { text: '', value: null },
        { text: '在岗', value: true },
        { text: '离职', value: false }
    ]

    constructor(
        private http: _HttpClient, 
        public msg: NzMessageService,
        private staffsService: StaffsService,
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
        this.staffsService.listOnePage(this.q)
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
        this.confirmContent = "确定要删除员工: " + obj.name + " ?";
        this.modalVisible = true;
        this.delObj = obj;
    }

    delete() {
        this.staffsService.delete(this.delObj.id)
                         .then(resp => this.msg.success("员工:" + resp.data.name + "已删除！")).then(resp => this.getData() )
                         .catch((error) => {this.msg.error(error); this.loading = false;})
    }

    add() {
        this.staffsService.formOperation = 'create';
        this.staffsService.isUpdate=false;
        this.router.navigateByUrl('/staffs/form');
    }

    update(id) {
        this.staffsService.formOperation='update';
        this.staffsService.initUpdate(id)
            .then(result => { this.staffsService.staff = result.data;})
            .then(() => this.router.navigateByUrl('/staffs/form')).catch((error)=>
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
        if ((this.q.staffno == null)||(this.q.staffno == "")){delete this.q.staffno}
        if ((this.q.name == null)||(this.q.name == "")){delete this.q.name}
        if (this.q.sex == null){delete this.q.sex}
        if ((this.q.idnumber == null)||(this.q.idnumber == "")){delete this.q.idnumber}
        if ((this.q.mobile == null)||(this.q.mobile == "")){delete this.q.mobile}
        if ((this.q.wechat == null)||(this.q.wechat == "")){delete this.q.wechat}
        if ((this.q.qqnum == null)||(this.q.qqnum == "")){delete this.q.qqnum}
        if (this.q.actived == null){delete this.q.actived}
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