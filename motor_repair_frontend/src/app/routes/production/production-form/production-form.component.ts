import {Component,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, delay, debounceTime } from 'rxjs/operators';

import { ReuseTabService,ReuseTabMatchMode } from '@delon/abc';
import { NzMessageService } from 'ng-zorro-antd';

import { ProductionService } from '../service/production.service';
import { Production } from '../domain/production.domain'; 
import { RolesService } from '../../roles/service/roles.service'; 
import { ProjectsService } from '../../projects/service/projects.service';

@Component({
    selector: 'production-form',
    templateUrl: './production-form.component.html'
})
export class ProductionFormComponent implements OnInit {

    form: FormGroup;
    production: Production;
    card_title = "";


    constructor(
        private reuseTabService: ReuseTabService,
        private fb: FormBuilder,
        private router: Router,
        private productionService: ProductionService,
        private msg: NzMessageService
        ) {
    }
    
    ngOnInit() {
        this.setTitle();
        if (this.productionService.formOperation == 'create') {this.production=null;}
        if (this.productionService.formOperation == 'update') {this.initUpdate();}
        this.form = this.fb.group({
            name : [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern('[\u4E00-\u9FA5-a-zA-Z0-9_]*$')]), this.nameValidator.bind(this)],
            attributes : [this.production? this.production.attributes : null],
            specifications : [this.production? this.production.specifications : null, ],
            // type : [this.production? this.production.type : null],
        });
        this.form.controls["name"].setValue(this.production? this.production.name : "")
    }


    setTitle() {
        if (this.productionService.formOperation == "create") { 
            this.reuseTabService.title ="创建产品"; 
            this.card_title = "创建产品";
        }
        if (this.productionService.formOperation == "update") { 
            this.reuseTabService.title ="修改产品";
            this.card_title = "修改产品";
        }
    }

    _submitForm() {
        for (const i in this.form.controls) {
            this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;

        let op = this.productionService.formOperation;
        if (op == 'create') this.productionService.add(this.form.value).then(resp => {
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('产品 ' + resp.data.name + ' 已创建！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));
        if (op == 'update') this.productionService.update(this.production.id, this.form.value).then(resp => {
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('产品 ' + resp.data.name + ' 已更新！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));

    }

    goBack() {
        this.router.navigateByUrl('/productions/page');
    }

    //用户名name异步验证
    nameValidator = (control: FormControl): Observable<any>  => {
        return control.valueChanges.pipe(
            debounceTime(200),
            map((value) => {
                let obj = {name: control.value, id: this.production? this.production.id: -1}; //如果为新增的情况，id参数设置为-1传递给后台
                this.productionService.checkNameAlreadyExists(obj)
                    .then(result => {
                if (result.error) {control.setErrors({ checked: true, error: true })} else if (!control.value){control.setErrors({ required: true })}  else {control.setErrors(null);};})   
            })
        )
    }

    initUpdate() {
        this.production = this.productionService.production;
    }
}