import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from '../domain/user.domain';
import { baseUrl } from '../../../shared/shared.service';
import { getTokenOptions } from '../../pages/login/login.service';

@Injectable()
export class UsersService {

  constructor(private http: Http) {}
   
  url = baseUrl+"project_users"

  listOnePage(q) {
    return this.http.get(this.url, getTokenOptions(q))
               .toPromise().then(res => {return res.json()})           
  }

  add(v, roles, project_id): Promise<any>{ 
    v.roles = roles;
    v.project = {id: project_id};
    let param = { user: v}; 
    return this.http.post(this.url, param, getTokenOptions(null))
               .map(response => response.json()).toPromise();
  }

  checkNameAlreadyExists(obj) {
    return this.http.get(baseUrl + `users/check/name`, getTokenOptions(obj)).map(response => response.json()).toPromise();
  }

  checkEmailAlreadyExists(email) {
      return this.http.get(baseUrl + `users/email/${email}`, getTokenOptions(null)).map(response => response.json()).toPromise();
  }

    delete(id: any) {
        return this.http.delete(this.url + `/${id}`, getTokenOptions(null))
                   .map(response => response.json())
                   .toPromise();
    }

  isUpdate = false;
  isAudit = false;

  formOperation = 'create';
  user : User = null;

  //获取用户对象将提供给修改页面Form使用
  initUpdate(id){

    return this.http.get(this.url + `/${id}`, getTokenOptions(null))
               .map(response => response.json()).toPromise();
  }

    activate(id){
        let obj = { user: { actived: true } } 
        return this.http.put(this.url + `/${id}`, obj, getTokenOptions(null))
            .map(response => response.json())
            .toPromise();
    }

    disable(id){
        let obj = { user: {actived: false} }; 
        return this.http.put(this.url + `/${id}`, obj, getTokenOptions(null))
            .map(response => response.json())
            .toPromise();
    }

  update(cid, v, roles, project_id): Promise<any>{
    v.roles = roles;
    v.project = {id: project_id};
    let obj = { user: v }; 
    return this.http.put(this.url + `/${cid}`,obj, getTokenOptions(null))
               .map(response => response.json()).toPromise();
  }

  changePwd(pwd){
    return this.http.post(this.url + `/changepwd/${pwd}`,"", getTokenOptions(null))
    .map(response => response.json()).toPromise();
  }

  getByName(name){
    return this.http.get(this.url + `/username/${name}`, getTokenOptions(null))
    .map(response => response.json()).toPromise();
  }

  uploadAvatar(token, file){

    const formData = new FormData();
    formData.append("avatar", file);

    return this.http.post(this.url + `/avatar/upload/${token}`,formData)
      .map(response => response.json()).toPromise();
  }

}