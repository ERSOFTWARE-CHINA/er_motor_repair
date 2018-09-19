import { SettingsService } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService, ReuseTabMatchMode } from '@delon/abc';
import { environment } from '@env/environment';

import { AuthenticationService } from '../service/login.service';
import { getMsgUrl, getMsgHashUrl } from '../../../utils/sms';

@Component({
    selector: 'passport-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.less' ],
    providers: [ SocialService ]
})
export class UserLoginComponent implements OnDestroy {

    form: FormGroup;
    error = '';
    type = 0;
    loading = false;

    invalidlogin = false;
    captchaInvalid = false;

    realCaptcha = null;

    // 默认显示用户名密码登陆的方式
    forget_password = false;

    constructor(
        fb: FormBuilder,
        private router: Router,
        public msg: NzMessageService,
        private settingsService: SettingsService,
        private socialService: SocialService,
        private loginService: AuthenticationService,
        @Optional() @Inject(ReuseTabService) private reuseTabService: ReuseTabService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
        
        // 不路由复用
        // this.reuseTabService.mode = ReuseTabMatchMode.URL
        // let reg: RegExp = /.*passport.*/
        // this.reuseTabService.excludes = [reg]

        this.form = fb.group({
            // project: [null, [Validators.required, Validators.minLength(4)]],
            user_mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
            password: [null, Validators.required],
            mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
            captcha: [null, [Validators.required]],
            remember: [true]
        });
    }

    // region: fields
    // get project() { return this.form.controls.project; }
    get user_mobile() { return this.form.controls.user_mobile; }
    get password() { return this.form.controls.password; }
    get mobile() { return this.form.controls.mobile; }
    get captcha() { return this.form.controls.captcha; }

    // endregion

    switch(ret: any) {
        this.type = ret.index;
    }

    // region: get captcha

    count = 0;
    interval$: any;

    getCaptcha() {
        // getMsgHashUrl("15156709660","123456");
        if (this.form.controls["mobile"].invalid) return;
        this.count = 59;
        this.realCaptcha = this.genCaptcha();
        let sendurl = getMsgUrl(this.form.controls["mobile"].value,this.realCaptcha,"登陆");
        this.loginService.sendMessage(sendurl).then(resp => console.log("send OK!"))
        console.log(this.realCaptcha)
        this.interval$ = setInterval(() => {
            this.count -= 1;
            if (this.count <= 0) {
                this.count = null
                this.realCaptcha = null;
                clearInterval(this.interval$);
            }
        }, 1000);
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

    // endregion

    submit() {
        this.error = '';
        if (this.type === 0) {
            this.user_mobile.markAsDirty();
            this.password.markAsDirty();
            // this.project.markAsDirty();
            if (this.user_mobile.invalid || this.password.invalid) return;
        } else {
            this.mobile.markAsDirty();
            this.captcha.markAsDirty();
            delete this.form.value["user_mobile"];
            if (this.mobile.invalid || this.captcha.invalid) return;
            if (this.captcha.value !== this.realCaptcha) {this.captchaInvalid = true;return};
        }
        

        this.loading = true;
        this.loginService.login(this.form.value)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    // this.reuseTabService.clear();
                    // this.reuseTabService.clearTitleCached();
                    this.router.navigate(['dashboard/v1']);
                } else{
                    this.loading = false;
                    this.invalidlogin = true;
                }
            }, 
            err => {
                this.msg.error(err);
            });
        
    }

    // region: social

    open(type: string, openType: SocialOpenType = 'href') {
        let url = ``;
        let callback = ``;
        if (environment.production)
            callback = 'https://cipchk.github.io/ng-alain/callback/' + type;
        else
            callback = 'http://localhost:4200/callback/' + type;
        switch (type) {
            case 'auth0':
                url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(callback)}`;
                break;
            case 'github':
                url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(callback)}`;
                break;
            case 'weibo':
                url = `https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(callback)}`;
                break;
        }
        if (openType === 'window') {
            this.socialService.login(url, '/', {
                type: 'window'
            }).subscribe(res => {
                if (res) {
                    this.settingsService.setUser(res);
                    this.router.navigateByUrl('/');
                }
            });
        } else {
            this.socialService.login(url, '/', {
                type: 'href'
            });
        }
    }

    onChange(){
        this.invalidlogin = false
    }

    // endregion

    ngOnDestroy(): void {
        if (this.interval$) clearInterval(this.interval$);
    }

    forget(){
        this.type = 1;
        this.forget_password = true;
    }

    not_forget(){
        this.type = 0;
        this.forget_password = false;
    }

    

    
}
