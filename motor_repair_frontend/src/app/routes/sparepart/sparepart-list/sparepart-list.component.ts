import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap } from 'rxjs/operators';

import { SparepartService } from '../service/sparepart.service';
import { UserStatusPipe } from '../../../pipes/pipes'; 

@Component({
    selector: 'sparepart-list',
    templateUrl: './sparepart-list.component.html'
})
export class SparepartListComponent implements OnInit {

    q: any = {
        page_index: 1,
        page_size: 15,
        sort_field: "name",
        sort_direction: "desc",
        name: null,
        attributes: null,
        specifications: null
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

    sortMap: any = {};

    constructor(
        private http: _HttpClient, 
        public msg: NzMessageService,
        private sparepartService: SparepartService,
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
        this.sparepartService.listOnePage(this.q)
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
        this.confirmContent = "确定要删除产品: " + obj.name + " ?";
        this.modalVisible = true;
        this.delObj = obj;
    }

    delete() {
        this.sparepartService.delete(this.delObj.id)
                         .then(resp => this.msg.success("产品:" + resp.data.name + "已删除！")).then(resp => this.getData() )
                         .catch((error) => {this.msg.error(error); this.loading = false;})
    }

    add() {
        this.sparepartService.formOperation = 'create';
        this.sparepartService.isUpdate=false;
        this.router.navigateByUrl('/spareparts/form');
    }

    update(id) {
        this.sparepartService.formOperation='update';
        this.sparepartService.initUpdate(id)
            .then(result => { this.sparepartService.sparepart = result.data;})
            .then(() => this.router.navigateByUrl('/spareparts/form')).catch((error)=>
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
        if ((this.q.attributes == null)||(this.q.attributes == "")){delete this.q.attributes}
        if ((this.q.specifications == null)||(this.q.specifications == "")){delete this.q.specifications}
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