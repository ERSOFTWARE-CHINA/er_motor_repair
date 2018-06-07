import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';

import { UsersService } from '../../../routes//users/service/users.service';

@Component({
  selector   : 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers: [UsersService]
})
export class SidebarComponent implements OnInit{
    // 左侧边栏用户资料信息
    project_name: string = localStorage.getItem('project_name')
    mobile: string = localStorage.getItem('mobile')

    constructor(
        private router: Router, 
        private fb: FormBuilder, 
        public settings: SettingsService, 
        public msgSrv: NzMessageService,
        private userSrv: UsersService) {
    }

    ngOnInit(){
      this.init_password_form()
    }

    logout(){
        localStorage.clear()
        this.router.navigateByUrl('/passport/login');
    }

    changePassword(){
        this.showModal();
    }

    // 创建备件弹窗
    modalVisible = false;
    password_form: FormGroup;

    showModal = () => {
        this.modalVisible = true;
        this.init_password_form();
    }

    handleOk = (e) => {
        for (const i in this.password_form.controls) {
            this.password_form.controls[ i ].markAsDirty();
        }
        if (this.password_form.valid) {
            this.userSrv.changePwd(this.password_form.value)
                        .then(resp => {
                            if (resp.error) this.msgSrv.error("原密码错误，无法修改密码")
                            if (resp.data) {this.msgSrv.success("密码修改成功"); this.modalVisible = false}
                        })
                        .catch(error => this.msgSrv.error(error))
        }
    }

    handleCancel = (e) => {
        this.modalVisible = false;
    }

    init_password_form() {
      this.password_form = this.fb.group({
          old: [null, [Validators.required]],
          new: [null, [Validators.required]],
          check_new: [null, [Validators.required, SidebarComponent.passwordEquar]]
      });
    }

    static passwordEquar(control: FormControl) {
        if (!control || !control.parent) return null;

        if (control.value !== control.parent.get('new').value) {
            return { equar: true };
        }
        return null;
    }

}
