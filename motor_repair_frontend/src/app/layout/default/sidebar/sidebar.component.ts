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
    username: string = localStorage.getItem('username')
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
            // this.spSrv.add(this.sparepart_form.value).then(resp => {
            //     if (resp.error) { 
            //         this.msg.error(resp.error);
            //     } else {
            //         this.msg.success('创建备件 ' + resp.data.name + ' 成功！');
            //         this.modalVisible = false;
            //         this.init_sparepart_form();
            //         console.log("push and set value")
            //         console.log(resp.data.name + (resp.data.specifications? ':'+resp.data.specifications : ''))
            //         this.spareparts.push(resp.data);
            //         this.parts_cost.controls[this.parts_cost_i]["controls"]["name"].setValue(resp.data.name + (resp.data.specifications? ':'+resp.data.specifications : ''))
            //     }}).then(resp => this.getSparepart()).catch(error => this.msg.error(error));
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
        console.log(control.value)
        console.log( control.parent.get('new').value)
        if (control.value !== control.parent.get('new').value) {
            return { equar: true };
        }
        return null;
    }

}
