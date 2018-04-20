import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap } from 'rxjs/operators';

import { UserStatusPipe } from '../../../pipes/pipes'; 
import { RolesService } from '../service/roles.service';
@Component({
    templateUrl: './list.component.html'
})
export class RoleListComponent implements OnInit {
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

    constructor(
        private http: _HttpClient, 
        public msg: NzMessageService,
        private rolesService: RolesService,
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
        this.rolesService.listOnePage(this.q)
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
        this.confirmContent = "确定要删除角色: " + obj.name + " ?";
        this.modalVisible = true;
        this.delObj = obj;
    }

    delete() {
        this.rolesService.delete(this.delObj.id)
                         .then(resp => this.msg.success("角色:" + resp.data.name + "已删除！")).then(resp => this.getData() )
                         .catch((error) => {this.msg.error(error); this.loading = false;})
    }

    add() {
        this.rolesService.formOperation = 'create';
        this.rolesService.isUpdate=false;
        this.router.navigateByUrl('/roles/form');
    }

    update(id) {
        this.rolesService.formOperation='update';
        this.rolesService.initUpdate(id)
            .then(result => { this.rolesService.role = result.data;})
            .then(() => this.router.navigateByUrl('/roles/form')).catch((error)=>
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
        if ((this.q.name == null)||(this.q.name == "")){delete this.q.name}
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