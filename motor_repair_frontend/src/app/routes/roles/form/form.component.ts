import {Component,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, delay, debounceTime } from 'rxjs/operators';

import { ReuseTabService,ReuseTabMatchMode } from '@delon/abc';
import { NzMessageService } from 'ng-zorro-antd';

import { RolesService } from '../../roles/service/roles.service';
import { Role } from '../domain/role.domain'; 
import { TransferItem } from '../../../utils/interfacet';
import { deepIndexOf } from '../../../utils/array';

@Component({
    templateUrl: './form.component.html'
})
export class RoleFormComponent implements OnInit {

    form: FormGroup;
    role: Role;
    card_title = "";
    perms_list: TransferItem[] = [];
    selected_perms_list: TransferItem[] = [];

    constructor(
        private reuseTabService: ReuseTabService,
        private fb: FormBuilder,
        private router: Router,
        private rolesService: RolesService,
        private msg: NzMessageService
        ) {}
    
    ngOnInit() {
        this.setTitle();
        this.getPerms();
        if (this.rolesService.formOperation == 'create') this.role=null;
        if (this.rolesService.formOperation == 'update') this.initUpdate();
        this.form = this.fb.group({
            name : [this.role? this.role.name : "", Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern('[\u4E00-\u9FA5-a-zA-Z0-9_]*$')])],
            perms: [this.role? this.role.perms_number : []]
        });
    }

    getPerms(){
        this.rolesService.listAllPerms().then(resp => {
                                                        this.perms_list = this.getTransferItemFormList(resp.default);
                                                        this.selected_perms_list = this.getTransferItemFormList(this.role?this.role.perms_number.default:[]);
                                                        this.setTransferDirection()
                                            })
                                        .catch(error => this.msg.error(error));                
    }

    getTransferItemFormList(list: string[]){
        let tis: TransferItem[] = []
        for (const i in list) {
            let a:TransferItem = {
                title: list[i],
                direction: 'left',
                disabled: false,
                checked: false,
                _hiden: false
            }
            tis.push(a)
        }
        return tis;
    }

    getListFromTransferItem(list: TransferItem[]){
        let pems: string[] = []
        for (const i in list) {
            pems.push(list[i].title)
        }
        return pems
    }

    setTransferDirection(){
        for (const i in this.perms_list) {
            if  (deepIndexOf(this.selected_perms_list, this.perms_list[i]) >= 0){
                this.perms_list[i].direction = 'right';
            } 
        } 
    }

    setTitle() {
        if (this.rolesService.formOperation == "create") { 
            this.reuseTabService.title ="创建角色"; 
            this.card_title = "创建角色";
        }
        if (this.rolesService.formOperation == "update") { 
            this.reuseTabService.title ="修改角色";
            this.card_title = "修改角色";
        }
    }

    _submitForm() {
        for (const i in this.form.controls) {
            this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        // if (this.form.valid) {
            
            this.form.controls["perms"].setValue(this.getListFromTransferItem(this.selected_perms_list));
            let op = this.rolesService.formOperation;
            if (op == 'create') this.rolesService.add(this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('角色 ' + resp.data.name + ' 已创建！');
                    this.goBack();
                }
                }).catch(error => this.msg.error(error));
            if (op == 'update') this.rolesService.update(this.role.id, this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('角色 ' + resp.data.name + ' 已更新！');
                    this.goBack();
                }
                }).catch(error => this.msg.error(error));
        // }
    }

    goBack() {
        this.router.navigateByUrl('/roles/page');
    }

    initUpdate() {
        this.role = this.rolesService.role;
    }

    // 穿梭框选择事件
    select(ret: any) {
    }

    // 穿梭框穿梭事件
    change(ret: any) {
        if (ret.to == "right") {
            this.selected_perms_list = this.selected_perms_list.concat(ret.list);
        } else {
            for (const i in ret.list) {
                this.selected_perms_list = this.selected_perms_list.filter(function(x) { return x.title != ret.list[i].title })
            }
        }
    }

}