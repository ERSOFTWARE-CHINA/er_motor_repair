import {Component,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, delay, debounceTime } from 'rxjs/operators';

import { ReuseTabService,ReuseTabMatchMode } from '@delon/abc';
import { NzMessageService } from 'ng-zorro-antd';

import { SparepartService } from '../service/sparepart.service';
import { Sparepart } from '../domain/sparepart.domain'; 
import { RolesService } from '../../roles/service/roles.service'; 
import { ProjectsService } from '../../projects/service/projects.service';

@Component({
    selector: 'sparepart-form',
    templateUrl: './sparepart-form.component.html'
})
export class SparepartFormComponent implements OnInit {

    form: FormGroup;
    sparepart: Sparepart;
    card_title = "";


    constructor(
        private reuseTabService: ReuseTabService,
        private fb: FormBuilder,
        private router: Router,
        private sparepartService: SparepartService,
        private msg: NzMessageService
        ) {
    }
    
    ngOnInit() {
        this.setTitle();
        if (this.sparepartService.formOperation == 'create') {this.sparepart=null;}
        if (this.sparepartService.formOperation == 'update') {this.initUpdate();}
        this.form = this.fb.group({
            name : [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern('[\u4E00-\u9FA5-a-zA-Z0-9_]*$')]), this.nameValidator.bind(this)],
            attributes : [this.sparepart? this.sparepart.attributes : null],
            specifications : [this.sparepart? this.sparepart.specifications : null, ],
            // type : [this.sparepart? this.sparepart.type : null],
        });
        this.form.controls["name"].setValue(this.sparepart? this.sparepart.name : "")
    }


    setTitle() {
        if (this.sparepartService.formOperation == "create") { 
            this.reuseTabService.title ="创建零配件"; 
            this.card_title = "创建零配件";
        }
        if (this.sparepartService.formOperation == "update") { 
            this.reuseTabService.title ="修改零配件";
            this.card_title = "修改零配件";
        }
    }

    _submitForm() {
        for (const i in this.form.controls) {
            this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;

        let op = this.sparepartService.formOperation;
        if (op == 'create') this.sparepartService.add(this.form.value).then(resp => {
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('零配件 ' + resp.data.name + ' 已创建！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));
        if (op == 'update') this.sparepartService.update(this.sparepart.id, this.form.value).then(resp => {
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('零配件 ' + resp.data.name + ' 已更新！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));

    }

    goBack() {
        this.router.navigateByUrl('/spareparts/page');
    }

    //用户名name异步验证
    nameValidator = (control: FormControl): Observable<any>  => {
        return control.valueChanges.pipe(
            debounceTime(200),
            map((value) => {
                let obj = {name: control.value, id: this.sparepart? this.sparepart.id: -1}; //如果为新增的情况，id参数设置为-1传递给后台
                this.sparepartService.checkNameAlreadyExists(obj)
                    .then(result => {
                if (result.error) {control.setErrors({ checked: true, error: true })} else if (!control.value){control.setErrors({ required: true })}  else {control.setErrors(null);};})   
            })
        )
    }

    initUpdate() {
        this.sparepart = this.sparepartService.sparepart;
    }
}