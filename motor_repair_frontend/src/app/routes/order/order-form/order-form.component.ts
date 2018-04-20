import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Order } from '../order-domain/order.domain';
import { Production } from '../../production/domain/production.domain';
import { NzMessageService } from 'ng-zorro-antd';
import { OrderService } from '../order-service/order.service';
import { Router } from '@angular/router';
import { ProductionService } from '../../production/service/production.service';

@Component({
    selector: 'app-order-form',
    templateUrl: './order-form.component.html',
})
export class OrderFormComponent implements OnInit {

    editIndex = -1;
    editObj = {};

    form: FormGroup;

    order: Order;

    // 产品列表
    productions: Production[] = [];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private orderService: OrderService,
        private productionService: ProductionService,
        private msg: NzMessageService
    ) { }

    ngOnInit() {
        let op = this.orderService.formOperation;
        if (op == 'create') this.initCreate();
        if (op == 'update') this.initUpdate();
        this.form = this.fb.group({
            name: [this.order ? this.order.name : '', [Validators.required]],
            pno: [this.order ? this.order.pno : '', [Validators.required, , Validators.maxLength(30), Validators.minLength(4),
            Validators.pattern('[\u4E00-\u9FA5-a-zA-Z0-9_]*$')]],
            date: [this.order ? this.order.date : '', [Validators.required]],
            price: [this.order ? this.order.price : '', [Validators.required, this.validateNumber.bind(this)]],
            remark: [this.order ? this.order.remark : ''],

            details: this.fb.array([])
        });
        if (op == 'update') {
            this.order.details ? this.order.details.forEach(i => {
                const field = this.createDetail();
                field.patchValue(i);
                this.details.push(field);
                field.controls["production"].setValue(i.production.name);
            }) : console.log("tihs contract has no details.");
        }
    }

    initCreate() {
        this.getProductions();
    }

    getProductions() {
        this.productionService.listAll()
            .then(resp => this.productions = resp.data)
            .catch((error) => { this.msg.error(error); })
    }

    initUpdate() {
        this.getProductions();
        this.order = this.orderService.order;
    }

    validateNumber(c: FormControl) {
        return c.value > 0 ? null : { validateNumber: true }
    };

    get details() { return this.form.controls.details as FormArray; }

    createDetail(): FormGroup {
        return this.fb.group({
            price: [null, [Validators.required]],
            amount: [null, [Validators.required]],
            total_price: [null],
            production: [null, [Validators.required]]
        });
    }

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
        let a= this.details.at(index)['controls']['production'].value
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
            let op = this.orderService.formOperation;
            if (op == 'create') this.orderService.add(this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('创建采购单 ' + resp.pno + ' 成功！');
                }
                console.log(resp);this.goBack()}).catch(error => this.msg.error(error));
            if (op == 'update') this.orderService.update(this.order.id, this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('更新采购单 ' + resp.pno + ' 成功！');
                }
                this.goBack();}).catch(error => this.msg.error(error));
            
        }
        
    }

    formatForm() {
        // 根据后端格式，重新组装details参数
        let details = [];
        let form_details = this.form.controls["details"].value;
        for (const i in form_details) {
            let v = form_details[i]
            let prod = {name : form_details[i].production} 
            v.production = prod
            details.push(v)
        }
        this.form.controls["details"].setValue(details);
    
    }

    goBack() {
        this.router.navigateByUrl('/purchases/page');
    }

}
