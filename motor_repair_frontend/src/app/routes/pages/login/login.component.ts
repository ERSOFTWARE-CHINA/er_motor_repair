import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { SettingsService } from '@core/services/settings.service';

import { NzMessageService } from 'ng-zorro-antd';
import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';

import { AuthenticationService } from './login.service';

@Component({
  selector: 'app-pages-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  valForm: FormGroup;
  
  // 异步操作等待状态
  waiting = false;
  button_label = "登录";

  // ngIf用来显示密码错误信息
  invalidlogin = false;

  constructor( private authenticationService: AuthenticationService, 
               fb: FormBuilder, 
               private router: Router,
               private msg: NzMessageService,
               public aclSrv: ACLService,
               private menuSrv: MenuService) {
    this.valForm = fb.group({
      project: [null, Validators.compose([Validators.required])],
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.required],
      remember_me: [null]
    });
  }

  submit() {
    
    // tslint:disable-next-line:forin
    for (const i in this.valForm.controls) {
      this.valForm.controls[i].markAsDirty();
    }
    if (this.valForm.valid) {
      this.waiting = true
      this.button_label = "登录中..."
      this.invalidlogin = false
      this.authenticationService.login(this.valForm.value)
			  .subscribe(result => {
        this.waiting = false
        this.button_label = "登录"
			  if (result) {
          this.router.navigate(['dashboard/v1']);
			  } else{
          this.invalidlogin = true
        }
			  }, 
			  err => { 
          this.msg.error(err);
          this.waiting = false
          this.button_label = "登录"
				  });
    }
  }

  onChange(){
    this.invalidlogin = false
  }


}
