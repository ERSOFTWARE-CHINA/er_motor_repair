import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';

import { RepairInfoService } from '../service/repair_info.service';
import { RepairInfo } from '../domain/repair_info.domain'; 
// import { stringToDate} from '../../../../utils/utils';
@Component({
    selector: 'repair_info-form',
    templateUrl: './form.component.html'
})
export class RepairInfoFormComponent implements OnInit {
    editIndex = -1;
    editObj = {};

    form: FormGroup;

    repairInfo: RepairInfo;

    constructor(
        private fb: FormBuilder, 
        private router: Router, 
        private mrSrv: RepairInfoService, 
        private msg: NzMessageService) {}

    ngOnInit() {
        let op = this.mrSrv.formOperation;
        if (op == 'create') this.initCreate();
        if (op == 'update') this.initUpdate();
        this.form = this.fb.group({
            no: [this.repairInfo? this.repairInfo.no : '', [Validators.required, ,Validators.minLength(4),
                                                              Validators.pattern('[\u4E00-\u9FA5-a-zA-Z0-9_]*$') ]],
            type: [this.repairInfo? this.repairInfo.type : '', [Validators.required]],
            time_cost: [this.repairInfo? this.repairInfo.time_cost : null, [Validators.required]],
            consultant : [this.repairInfo? this.repairInfo.consultant : null],
            entry_date : [this.repairInfo? this.repairInfo.entry_date : null, [Validators.required]],
            return_date : [this.repairInfo? this.repairInfo.return_date : null],
            items : [this.repairInfo? this.repairInfo.items : null],
            customer_comment : [this.repairInfo? this.repairInfo.customer_comment : null],
            repairman_comment : [this.repairInfo? this.repairInfo.repairman_comment : null],
            advise : [this.repairInfo? this.repairInfo.advise : null],
            mileage : [this.repairInfo? this.repairInfo.mileage : null],
            next_mileage : [this.repairInfo? this.repairInfo.next_mileage : null],
            next_date : [this.repairInfo? this.repairInfo.next_date : null],
            agent : [this.repairInfo? this.repairInfo.agent : null],
            agent_mobile : [this.repairInfo? this.repairInfo.agent_mobile : null],
            parts_cost: this.fb.array([])
        });
        if (op == 'update'){
        this.repairInfo.parts_cost? this.repairInfo.parts_cost.forEach(i => {
            const field = this.createPartsCost();
            field.patchValue(i);
            this.parts_cost.push(field);
            // field.controls["sparepart"].setValue(i.sparepart.name);
        }) : console.log("tihs contract has no parts_cost.");}

    }

    createPartsCost(): FormGroup {
        return this.fb.group({
            name: [ null, [ Validators.required ] ],
            amount: [ null, [ Validators.required ] ],
            unit_price: [ null, [ Validators.required ] ],
            total: [ null, [ Validators.required ] ]
        });
    }


    get parts_cost() { return this.form.controls.parts_cost as FormArray; }
    
    add() {
        this.parts_cost.push(this.createPartsCost());
        this.edit(this.parts_cost.length - 1);
    }

    del(index: number) {
        this.parts_cost.removeAt(index);
    }

    edit(index: number) {
        if (this.editIndex !== -1 && this.editObj) {
            this.parts_cost.at(this.editIndex).patchValue(this.editObj);
        }
        this.editObj = { ...this.parts_cost.at(index).value };
        this.editIndex = index;
    }

    save(index: number) {
        this.parts_cost.at(index).markAsDirty();
        if (this.parts_cost.at(index).invalid) return;
        this.editIndex = -1;
    }

    cancel(index: number) {
        if (!this.parts_cost.at(index).value.key) {
            this.del(index);
        } else {
            this.parts_cost.at(index).patchValue(this.editObj);
        }
        this.editIndex = -1;
    }

    _submitForm() {
        console.log("submit start!!")
        for (const i in this.form.controls) {
          this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) {console.log(this.form.controls);return} ;
        if (this.form.valid) {
            console.log("form is valid!!")
            this.formatForm() 
            let op = this.mrSrv.formOperation;
            if (op == 'create') this.mrSrv.add(this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('创建维修单 ' + resp.no + ' 成功！');
                }
                console.log(resp);this.goBack()}).catch(error => this.msg.error(error));
            if (op == 'update') this.mrSrv.update(this.repairInfo.id, this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('更新维修单 ' + resp.no + ' 成功！');
                }
                this.goBack();}).catch(error => this.msg.error(error));
            
        }
        
    }

    goBack() {
        this.router.navigateByUrl('/repair_info/page');
    }

    initCreate() {
    }

    initUpdate() {
        this.repairInfo = this.mrSrv.repairInfo;
        console.log(this.repairInfo)
    }

    formatForm() {
        // 根据后端格式，重新组装parts_cost参数
        let parts_cost = [];
        let form_parts_cost = this.form.controls["parts_cost"].value;
        for (const i in form_parts_cost) {
            let v = form_parts_cost[i]
            let sparepart = {name : form_parts_cost[i].sparepart} 
            v.sparepart = sparepart
            parts_cost.push(v)
            console.log(v)
        }
        this.form.controls["parts_cost"].setValue(parts_cost);
    }

    //数字验证
    validateNumber(c: FormControl) {
        return c.value > 0 ? null : {validateNumber: true}
    };
    
}