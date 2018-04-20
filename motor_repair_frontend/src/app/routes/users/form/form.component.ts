import {Component,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, delay, debounceTime } from 'rxjs/operators';

import { ReuseTabService,ReuseTabMatchMode } from '@delon/abc';
import { NzMessageService } from 'ng-zorro-antd';

import { UsersService } from '../service/users.service';
import { User } from '../domain/user.domain'; 
import { RolesService } from '../../roles/service/roles.service'; 
import { ProjectsService } from '../../projects/service/projects.service';

@Component({
    selector: 'user-form',
    templateUrl: './form.component.html'
})
export class UsersFormComponent implements OnInit {

    form: FormGroup;
    user: User;
    card_title = "";
    // 角色列表
    roles: any[] = [];
    // 已选择角色
    multi_roles: any[];

    constructor(
        private reuseTabService: ReuseTabService,
        private fb: FormBuilder,
        private router: Router,
        private usersService: UsersService,
        private rolesService: RolesService,
        private msg: NzMessageService
        ) {
    }
    
    ngOnInit() {
        this.setTitle();
        if (this.usersService.formOperation == 'create') {this.user=null; this.getRoles();}
        if (this.usersService.formOperation == 'update') {this.getRoles();this.initUpdate();}
        this.form = this.fb.group({
            name : [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern('[\u4E00-\u9FA5-a-zA-Z0-9_]*$')]), this.nameValidator.bind(this)],
            email : [this.user? this.user.email : null, EmailValidator],
            real_name : [this.user? this.user.real_name : null, Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern('[\u4E00-\u9FA5-a-zA-Z0-9_]*$')])],
            position : [this.user? this.user.position : null],
            actived : [this.user? this.user.actived : null, Validators.required],
            is_admin : [this.user? this.user.is_admin : null, Validators.required],
            roles : [this.user? this.user.roles : null]
        });
        this.form.controls["name"].setValue(this.user? this.user.name : "")
    }

    getRoles() {
        this.rolesService.listAll()
            .then(resp => {this.roles = resp.data;})
            .catch((error) => {this.msg.error(error);})
    }

    setTitle() {
        if (this.usersService.formOperation == "create") { 
            this.reuseTabService.title ="创建用户"; 
            this.card_title = "创建用户";
        }
        if (this.usersService.formOperation == "update") { 
            this.reuseTabService.title ="修改用户";
            this.card_title = "修改用户";
        }
    }

    _submitForm() {
        for (const i in this.form.controls) {
            this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        this.formatForm();

        let op = this.usersService.formOperation;
        if (op == 'create') this.usersService.add(this.form.value, this.roles).then(resp => {
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('用户 ' + resp.data.name + ' 已创建！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));
        if (op == 'update') this.usersService.update(this.user.id, this.form.value, this.roles).then(resp => {
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('用户 ' + resp.data.name + ' 已更新！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));

    }

    goBack() {
        this.router.navigateByUrl('/users/page');
    }

    formatForm() {
        // 格式化form中的roles属性
        // this.user = this.form.value;
        if (this.form["controls"]["roles"].value != null) {
            let roles = [];
            let role_ids = this.form["controls"]["roles"].value;
            for (var i=0; i<role_ids.length;i++) {
                let r = {id:  role_ids[i]}
                roles.push(r);   
            }
            this.roles = roles;
        } 
    }

    //用户名name异步验证
    nameValidator = (control: FormControl): Observable<any>  => {
        return control.valueChanges.pipe(
            debounceTime(200),
            map((value) => {
                let obj = {name: control.value, id: this.user? this.user.id: -1}; //如果为新增的情况，id参数设置为-1传递给后台
                this.usersService.checkNameAlreadyExists(obj)
                    .then(result => {
                if (result.error) {control.setErrors({ checked: true, error: true })} else if (!control.value){control.setErrors({ required: true })}  else {control.setErrors(null);};})   
            })
        )
    }

    initUpdate() {
        this.user = this.usersService.user;
        this.roles = this.usersService.user.roles;
        // 加载roles到form control
        let roles_ids = []
        for (var i=0; i<this.roles.length;i++) {
            let r = this.roles[i].id;
            roles_ids.push(r);   
        }
        this.multi_roles = roles_ids;
    }
}