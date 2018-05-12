import { Component, OnDestroy } from '@angular/core';
import { Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

import { Observable } from 'rxjs/Observable';
import { map, delay, debounceTime } from 'rxjs/operators';

import { ReuseTabService, ReuseTabMatchMode } from '@delon/abc';

import { RegisterService } from '../service/register.service';
import { ProjectsService } from '../../projects/service/projects.service';
import { UsersService } from '../../users/service/users.service';

import { getMsgUrl, getMsgHashUrl } from '../../../utils/sms';

@Component({
    selector: 'passport-register',
    templateUrl: './register.component.html',
    styleUrls: [ './register.component.less' ],
    providers:[ProjectsService, UsersService]
})
export class UserRegisterComponent implements OnDestroy {

    form: FormGroup;
    error = '';
    type = 0;
    loading = false;
    visible = false;
    status = 'pool';
    progress = 0;
    passwordProgressMap = {
        ok: 'success',
        pass: 'normal',
        pool: 'exception'
    };

    realCaptcha=null;
    captchaInvalid=false;

    constructor(fb: FormBuilder, 
                private router: Router, 
                public msg: NzMessageService,
                @Optional() @Inject(ReuseTabService) private reuseTabService: ReuseTabService,
                private registService: RegisterService,
                private projectSrv: ProjectsService,
                private userSrv: UsersService) {
        
        // 不路由复用
        this.reuseTabService.mode = ReuseTabMatchMode.URL
        let reg: RegExp = /.*passport.*/
        this.reuseTabService.excludes = [reg]
        
        this.form = fb.group({
            project: [null, [Validators.required], this.nameValidator.bind(this)],
            name: [null, [Validators.required]],
            password: [null, [Validators.required, Validators.minLength(6), UserRegisterComponent.checkPassword.bind(this)]],
            confirm: [null, [Validators.required, Validators.minLength(6), UserRegisterComponent.passwordEquar]],
            mobilePrefix: [ '+86' ],
            mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)], this.mobileValidator.bind(this)],
            captcha: [null, [Validators.required]]
        });
    }

    static checkPassword(control: FormControl) {
        if (!control) return null;
        const self: any = this;
        self.visible = !!control.value;
        if (control.value && control.value.length > 9)
            self.status = 'ok';
        else if (control.value && control.value.length > 5)
            self.status = 'pass';
        else
            self.status = 'pool';

        if (self.visible) self.progress = control.value.length * 10 > 100 ? 100 : control.value.length * 10;
    }

    static passwordEquar(control: FormControl) {
        if (!control || !control.parent) return null;
        if (control.value !== control.parent.get('password').value) {
            return { equar: true };
        }
        return null;
    }

    // region: fields
    get project() { return this.form.controls.project; }
    get name() { return this.form.controls.name; }
    get password() { return this.form.controls.password; }
    get confirm() { return this.form.controls.confirm; }
    get mobile() { return this.form.controls.mobile; }
    get captcha() { return this.form.controls.captcha; }

    // endregion

    // region: get captcha

    count = null;
    interval$: any;

    getCaptcha() {
        // getMsgHashUrl("15156709660","123456");
        this.count = 59;
        this.realCaptcha = this.genCaptcha();
        let sendurl = getMsgUrl(this.form.controls["mobile"].value,this.realCaptcha,"注册");
        console.log(sendurl);
        this.registService.sendMessage(sendurl).then(resp => console.log("send OK!"))
        this.interval$ = setInterval(() => {
            this.count -= 1;
            if (this.count <= 0) {
                this.count = null
                this.realCaptcha = null;
                clearInterval(this.interval$);
            }
        }, 1000);
    }

    // endregion

    submit() {
        this.count = null
        this.error = '';
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        if (this.form.invalid) return;
        if (!this.checkCaptcha()) {
            this.captchaInvalid = true;
            return;
        }

        this.loading = true;
        this.registService.register(this.form.value)
            .then(resp => {
                if (resp.ok) {
                    this.registService.registeredName = resp.ok.name;
                    this.router.navigateByUrl('/passport/register-result');
                }
                if (resp.error) this.msg.error(resp.error)
            })
            .catch(error => this.msg.error(error));
        this.loading = false;

    }

    genCaptcha() {
        var c = '';
        for(var i =0;i<6;i++){
            var num = Math.floor(Math.random()*10);
            c = c + num.toString()
        }  
        console.log(c)       
        return c
    }; 

    checkCaptcha() {
        if (this.realCaptcha == null) return false
        if (this.form.controls["captcha"].value == this.realCaptcha) return true
        else return false;
    }

    onChange(){
        this.captchaInvalid = false;
    }

    ngOnDestroy(): void {
        if (this.interval$) clearInterval(this.interval$);
    }

    nameValidator = (control: FormControl): Observable<any>  => {
        return control.valueChanges.pipe(
            debounceTime(200),
            map((value) => {
                let obj = {name: control.value, id: -1}; //传送一个不存在的id给后台
                this.projectSrv.checkNameAlreadyExists(obj)
                    .then(result => {
                if (result.error) {control.setErrors({ checked: true, error: true })} else if (!control.value){control.setErrors({ required: true })}  else {control.setErrors(null);};})   
            })
        )
    }

    mobileValidator = (control: FormControl): Observable<any>  => {
        return control.valueChanges.pipe(
            debounceTime(200),
            map((value) => {
                let obj = {mobile: control.value, id: -1}; //传送一个不存在的id给后台
                this.userSrv.checkMobileAlreadyExists(obj)
                    .then(result => {
                if (result.error) {control.setErrors({ checked: true, error: true })} else if (!control.value){control.setErrors({ required: true })}  else {control.setErrors(null);};})   
            })
        )
    }
}
