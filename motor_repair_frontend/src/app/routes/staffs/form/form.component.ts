import {Component,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, delay, debounceTime } from 'rxjs/operators';

import { ReuseTabService,ReuseTabMatchMode } from '@delon/abc';
import { NzMessageService } from 'ng-zorro-antd';

import { StaffsService } from '../../staffs/service/staffs.service';
import { Staff } from '../domain/staff.domain'; 
import { TransferItem } from '../../../utils/interfacet';
import { deepIndexOf } from '../../../utils/array';

@Component({
    templateUrl: './form.component.html'
})
export class StaffFormComponent implements OnInit {

    form: FormGroup;
    staff: Staff;
    card_title = "";
    perms_list: TransferItem[] = [];
    selected_perms_list: TransferItem[] = [];

    constructor(
        private reuseTabService: ReuseTabService,
        private fb: FormBuilder,
        private router: Router,
        private staffsService: StaffsService,
        private msg: NzMessageService
        ) {}
    
    ngOnInit() {
        this.setTitle();
//        this.getPerms();
        if (this.staffsService.formOperation == 'create') this.staff=null;
        if (this.staffsService.formOperation == 'update') this.initUpdate();
        this.form = this.fb.group({
            name : [this.staff? this.staff.name : "", Validators.compose([Validators.required])],
            staffno : [this.staff? this.staff.staffno : null, Validators.required],
            sex : [this.staff? this.staff.sex : null, Validators.required],
            idnumber : [this.staff? this.staff.idnumber : null],
            mobile : [this.staff? this.staff.mobile : null, Validators.required],
            wechat : [this.staff? this.staff.wechat : null],
            qqnum : [this.staff? this.staff.qqnum : null],
            actived : [this.staff? this.staff.actived : null, Validators.required]
        });
    }

    // getPerms(){
    //     this.staffsService.listAllPerms().then(resp => {
    //                                                     this.perms_list = this.getTransferItemFormList(resp.default);
    //                                                     this.selected_perms_list = this.getTransferItemFormList(this.staff?this.staff.perms_number.default:[]);
    //                                                     this.setTransferDirection()
    //                                         })
    //                                     .catch(error => this.msg.error(error));                
    // }

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
        if (this.staffsService.formOperation == "create") { 
            this.reuseTabService.title ="创建员工"; 
            this.card_title = "创建员工";
        }
        if (this.staffsService.formOperation == "update") { 
            this.reuseTabService.title ="修改员工";
            this.card_title = "修改员工";
        }
    }

    _submitForm() {
        for (const i in this.form.controls) {
            this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        // if (this.form.valid) {
//            this.form.controls["perms"].setValue(this.getListFromTransferItem(this.selected_perms_list));
            let op = this.staffsService.formOperation;
            if (op == 'create') this.staffsService.add(this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('员工 ' + resp.data.name + ' 已创建！');
                    this.goBack();
                }
                }).catch(error => this.msg.error(error));
            if (op == 'update') this.staffsService.update(this.staff.id, this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('员工 ' + resp.data.name + ' 已更新！');
                    this.goBack();
                }
                }).catch(error => this.msg.error(error));
        // }
    }

    goBack() {
        this.router.navigateByUrl('/staffs/page');
    }

    initUpdate() {
        this.staff = this.staffsService.staff;
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