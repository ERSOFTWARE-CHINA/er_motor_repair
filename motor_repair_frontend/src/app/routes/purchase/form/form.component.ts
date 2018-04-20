import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';

import { PurchaseService } from '../service/purchase.service';
import { SparepartService } from '../../sparepart/service/sparepart.service';
import { OrderService } from '../../order/order-service/order.service';
import { Purchase } from '../domain/purchase.domain'; 
// import { stringToDate} from '../../../../utils/utils';

@Component({
    selector: 'purchase-form',
    templateUrl: './form.component.html'
})
export class PurchaseFormComponent implements OnInit {
    editIndex = -1;
    editObj = {};

    form: FormGroup;

    purchase: Purchase;

    // 订单列表
    orders: any[] =[];
    // 配件列表
    spareparts: any[] =[];
    // 已选择项目
    single_order: any= null; 

    constructor(
        private fb: FormBuilder, 
        private router: Router, 
        private purchaseService: PurchaseService, 
        private orderService: OrderService,
        private sparepartService: SparepartService,
        private msg: NzMessageService) {}

    ngOnInit() {
        let op = this.purchaseService.formOperation;
        if (op == 'create') this.initCreate();
        if (op == 'update') this.initUpdate();
        this.form = this.fb.group({
            pno: [this.purchase? this.purchase.pno : '', [Validators.required, ,Validators.maxLength(30), Validators.minLength(4),
                                                              Validators.pattern('[\u4E00-\u9FA5-a-zA-Z0-9_]*$') ]],
            date: [this.purchase? this.purchase.date : '', [Validators.required]],
            price : [this.purchase? this.purchase.price : '', [Validators.required,this.validateNumber.bind(this)]],
            remark : [this.purchase? this.purchase.remark : ''],
            order : [this.purchase? this.purchase.order : '', [Validators.required]],

            details: this.fb.array([])
        });
        if (op == 'update'){
        this.purchase.details? this.purchase.details.forEach(i => {
            const field = this.createDetail();
            field.patchValue(i);
            this.details.push(field);
            // console.log(this.purchase.details);
            // console.log(i);
            field.controls["sparepart"].setValue(i.sparepart.name);
        }) : console.log("tihs contract has no details.");}

    }

    createDetail(): FormGroup {
        return this.fb.group({
            price: [ null, [ Validators.required ] ],
            amount: [ null, [ Validators.required ] ],
            total_price: [ null ],
            sparepart: [ null, [ Validators.required ] ]
        });
    }

    getOrders() {
        this.orderService.listAll()
        .then(resp => this.orders = resp.data)
        .catch((error) => {this.msg.error(error);})
    }

    getSpareparts() {
        this.sparepartService.listAll()
        .then(resp => this.spareparts = resp.data)
        .catch((error) => {this.msg.error(error);})
    }

    // //#region get form fields
    // get cno() { return this.form.controls.cno; }
    // get date() { return this.form.controls.date; }
    // get location() { return this.form.controls.location; }
    // get amount() { return this.form.controls.amount; }
    // // get stockin_amount() { return this.form.controls.stockin_amount; }
    // get partya() { return this.form.controls.partya; }
    // get partyb() { return this.form.controls.partyb; }
    // get audited() { return this.form.controls.audited; }
    // get audit_time() { return this.form.controls.audit_time; }
    // get audit_user() { return this.form.controls.audit_user; }
    // get create_user() { return this.form.controls.create_user; }

    get details() { return this.form.controls.details as FormArray; }
    //#endregion
    add() {
        this.details.push(this.createDetail());
        this.edit(this.details.length - 1);
    }

    del(index: number) {
        this.details.removeAt(index);
    }

    edit(index: number) {
        if (this.editIndex !== -1 && this.editObj) {
            this.details.at(this.editIndex).patchValue(this.editObj);
        }
        this.editObj = { ...this.details.at(index).value };
        this.editIndex = index;
    }

    save(index: number) {
        
        this.details.at(index).markAsDirty();
        if (this.details.at(index).invalid) return;
        let total = this.details.at(index)['controls']['price'].value * this.details.at(index)['controls']['amount'].value
        this.details.at(index)['controls']['total_price'].setValue(total)
        let a= this.details.at(index)['controls']['sparepart'].value
        console.log(a)
        // this.details.at(index)['controls']['sparepart'].setValue(a)
        this.editIndex = -1;
        
    }

    cancel(index: number) {
        
        if (!this.details.at(index).value.key) {
            this.del(index);
        } else {
            this.details.at(index).patchValue(this.editObj);
        }
        this.editIndex = -1;

    }

    _submitForm() {

        for (const i in this.form.controls) {
          this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        if (this.form.valid) {
            this.formatForm() 
            let op = this.purchaseService.formOperation;
            if (op == 'create') this.purchaseService.add(this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('创建采购单 ' + resp.pno + ' 成功！');
                }
                console.log(resp);this.goBack()}).catch(error => this.msg.error(error));
            if (op == 'update') this.purchaseService.update(this.purchase.id, this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('更新采购单 ' + resp.pno + ' 成功！');
                }
                this.goBack();}).catch(error => this.msg.error(error));
            
        }
        
    }

    goBack() {
        this.router.navigateByUrl('/purchases/page');
    }

    initCreate() {
        this.getOrders();
        this.getSpareparts();
    }

    initUpdate() {
        this.getOrders();
        this.getSpareparts();
        this.purchase = this.purchaseService.purchase;
        // 加载project到form control
        this.single_order = this.purchase.order_id;
    }

    formatForm() {
        // 根据后端格式，重新组装details参数
        let details = [];
        let form_details = this.form.controls["details"].value;
        for (const i in form_details) {
            let v = form_details[i]
            let sparepart = {name : form_details[i].sparepart} 
            v.sparepart = sparepart
            details.push(v)
        }
        this.form.controls["details"].setValue(details);

    
    }

    //数字验证
    validateNumber(c: FormControl) {
        return c.value > 0 ? null : {validateNumber: true}
    };
    

}