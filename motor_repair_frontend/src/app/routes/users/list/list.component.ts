import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap } from 'rxjs/operators';

import { UsersService } from '../service/users.service';
import { UserStatusPipe } from '../../../pipes/pipes'; 

@Component({
    selector: 'user-list',
    templateUrl: './list.component.html'
})
export class UsersListComponent implements OnInit {

    q: any = {
        page_index: 1,
        page_size: 15,
        sort_field: "name",
        sort_direction: "desc",
        name: null,
        actived: null,
        real_name: null,
        email: null,
        position: null
    };
    // 记录总数
    total: number;
    // 用户列表
    data: any[] = [];
    // 机构树
    tree: any[] = [];
    // 删除对象
    delObj = null;

    loading = false;

    actived_status = [
        { text: '不限定', value: null },
        { text: '已激活', value: true },
        { text: '未激活', value: false }
    ]
    sortMap: any = {};

    constructor(
        private http: _HttpClient, 
        public msg: NzMessageService,
        private usersService: UsersService,
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
        this.usersService.listOnePage(this.q)
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
        this.confirmContent = "确定要删除用户: " + obj.name + " ?";
        this.modalVisible = true;
        this.delObj = obj;
    }

    delete() {
        this.usersService.delete(this.delObj.id)
                         .then(resp => this.msg.success("用户:" + resp.data.name + "已删除！")).then(resp => this.getData() )
                         .catch((error) => {this.msg.error(error); this.loading = false;})
    }

    add() {
        this.usersService.formOperation = 'create';
        this.usersService.isUpdate=false;
        this.router.navigateByUrl('/users/form');
    }

    update(id) {
        this.usersService.formOperation='update';
        this.usersService.initUpdate(id)
            .then(result => { this.usersService.user = result.data;})
            .then(() => this.router.navigateByUrl('/users/form')).catch((error)=>
            this.msg.error(error)); 
    }

    activate(id) {
        this.usersService.activate(id)
            .then(resp => this.msg.success("用户:" + resp.data.name + "已激活！")).then(resp => this.getData() )
            .catch((error) => {this.msg.error(error); this.loading = false;})
    }

    disable(id) {
        this.usersService.disable(id)
            .then(resp => this.msg.success("用户:" + resp.data.name + "已禁用！")).then(resp => this.getData() )
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
        if ((this.q.name == null)||(this.q.name == "")){delete this.q.name}
        if (this.q.actived == null){delete this.q.actived}
        if ((this.q.real_name == null)||(this.q.real_name == "")){delete this.q.real_name}
        if ((this.q.email == null)||(this.q.email == "")){delete this.q.email}
        if ((this.q.position == null)||(this.q.position == "")){delete this.q.position}
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