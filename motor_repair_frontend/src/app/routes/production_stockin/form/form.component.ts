import {Component,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, delay, debounceTime } from 'rxjs/operators';

import { ReuseTabService,ReuseTabMatchMode } from '@delon/abc';
import { NzMessageService } from 'ng-zorro-antd';

import { ProductionStockinService } from '../service/production_stockin.service';
import { ProductionStockin } from '../domain/production_stockin.domain'; 
import { ProductionService } from '../../production/service/production.service'; 
import { OrderService } from '../../order/order-service/order.service';

@Component({
    selector: 'production_stockin-form',
    templateUrl: './form.component.html'
})
export class ProductionStockinFormComponent implements OnInit {

    form: FormGroup;
    productionStockin: ProductionStockin;
    card_title = "";
    // 产品列表
    productions: any[] = [];
    // 已选择产品
    single_production: any = null;

    // 订单列表
    orders: any[] =[];
    // 已选择订单
    single_order: any= null; 

    constructor(
        private reuseTabService: ReuseTabService,
        private fb: FormBuilder,
        private router: Router,
        private psiService: ProductionStockinService,
        private productionService: ProductionService,
        private orderService: OrderService,
        private msg: NzMessageService
        ) {
    }
    
    ngOnInit() {
        this.setTitle();
        if (this.psiService.formOperation == 'create') {this.productionStockin=null; this.getProductions(); this.getOrders();}
        if (this.psiService.formOperation == 'update') {this.getProductions();this.getOrders();this.initUpdate()};
        this.form = this.fb.group({
            no : [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern('[\u4E00-\u9FA5-a-zA-Z0-9_]*$')]), this.noValidator.bind(this)],
            amount : [this.productionStockin? this.productionStockin.amount : null, [Validators.required, this.validateNumber.bind(this)]],
            unit : [this.productionStockin? this.productionStockin.unit : null,],
            remark : [this.productionStockin? this.productionStockin.remark : null],
            production : [this.productionStockin? this.productionStockin.production : null],
            order : [this.productionStockin? this.productionStockin.order : null]
        });
        this.form.controls["no"].setValue(this.productionStockin? this.productionStockin.no : null)
    }

    getProductions() {
        this.productionService.listAll()
            .then(resp => this.productions = resp.data)
            .catch((error) => {this.msg.error(error);})
    }

    getOrders() {
        this.orderService.listAll()
            .then(resp => this.orders = resp.data)
            .catch((error) => {this.msg.error(error);})
    }

    setTitle() {
        if (this.psiService.formOperation == "create") { 
            this.reuseTabService.title ="创建产品入库"; 
            this.card_title = "创建产品入库";
        }
        if (this.psiService.formOperation == "update") { 
            this.reuseTabService.title ="修改产品入库";
            this.card_title = "修改产品入库";
        }
    }

    _submitForm() {
        for (const i in this.form.controls) {
            this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        this.formatForm();

        let op = this.psiService.formOperation;
        if (op == 'create') this.psiService.add(this.form.value).then(resp => {
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('入库信息 ' + resp.data.name + ' 已创建！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));
        if (op == 'update') this.psiService.update(this.productionStockin.id, this.form.value).then(resp => {
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('入库信息 ' + resp.data.name + ' 已更新！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));

    }

    goBack() {
        this.router.navigateByUrl('/production_stock/page');
    }

    formatForm() {
        // 格式化form中的roles属性
        // this.user = this.form.value;
        // if (this.form["controls"]["roles"].value != null) {
        //     let roles = [];
        //     let role_ids = this.form["controls"]["roles"].value;
        //     for (var i=0; i<role_ids.length;i++) {
        //         let r = {id:  role_ids[i]}
        //         roles.push(r);   
        //     }
        //     this.roles = roles;
        // } 
    }

    //单号no异步验证
    noValidator = (control: FormControl): Observable<any>  => {
        return control.valueChanges.pipe(
            debounceTime(200),
            map((value) => {
                let obj = {name: control.value, id: this.productionStockin? this.productionStockin.id: -1}; //如果为新增的情况，id参数设置为-1传递给后台
                this.psiService.checkNoAlreadyExists(obj)
                    .then(result => {
                if (result.error) {control.setErrors({ checked: true, error: true })} else if (!control.value){control.setErrors({ required: true })}  else {control.setErrors(null);};})   
            })
        )
    }
        
    //数字验证
    validateNumber(c: FormControl) {
        return c.value > 0 ? null : {validateNumber: true}
    };

    initUpdate() {
        this.productionStockin = this.psiService.productionStockin;
        // let roles = this.usersService.user.roles;
        // // 加载roles到form control
        // let roles_ids = []
        // for (var i=0; i<roles.length;i++) {
        //     let r = roles[i].id;
        //     roles_ids.push(r);   
        // }
        // this.multi_roles = roles_ids;
        // // 加载project到form control
        // this.single_project = this.user.project_id;
    }
}