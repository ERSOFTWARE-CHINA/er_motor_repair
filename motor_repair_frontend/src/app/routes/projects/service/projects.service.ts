import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Project } from '../domain/project.domain';
import { baseUrl } from '../../../shared/shared.service';
import { getTokenOptions } from '../../pages/login/login.service';
@Injectable()
export class ProjectsService {

  constructor(private http: Http) {}
   
  url = baseUrl+"projects"

    listOnePage(q) {
        return this.http.get(this.url, getTokenOptions(q))
                   .toPromise().then(res => {return res.json()})           
    }

    // 所有项目不超过128个
    listAll() {
        return this.http.get(this.url+`?page_size=128`, getTokenOptions(null))
                   .toPromise().then(res => {return res.json()})           
    }

    add(v): Promise<any>{ 
        let param = { project: v} 
        return this.http.post(this.url, param, getTokenOptions(null))
                   .map(response => response.json()).toPromise();
    }

    checkNameAlreadyExists(obj) {
      return this.http.get(baseUrl + `projects/check/name`, getTokenOptions(obj)).map(response => response.json()).toPromise();
    }

    delete(id: any) {
        return this.http.delete(this.url + `/${id}`, getTokenOptions(null))
                   .map(response => response.json())
                   .toPromise();
    }

  isUpdate = false;
  isAudit = false;

  formOperation = 'create';
  project : Project = null;

  //获取用户对象将提供给修改页面Form使用
  initUpdate(id){
    return this.http.get(this.url + `/${id}`, getTokenOptions(null))
               .map(response => response.json()).toPromise();
  }

    activate(id){
        let obj = { project: { actived: true } } 
        return this.http.put(this.url + `/${id}`, obj, getTokenOptions(null))
            .map(response => response.json())
            .toPromise();
    }

    disable(id){
        let obj = { project: {actived: false} }; 
        return this.http.put(this.url + `/${id}`, obj, getTokenOptions(null))
            .map(response => response.json())
            .toPromise();
    }

  update(cid, v): Promise<any>{
    let obj = { project: v} 
    return this.http.put(this.url + `/${cid}`,obj, getTokenOptions(null))
               .map(response => response.json()).toPromise();
  }

  changePwd(pwd){
    return this.http.post(this.url + `/changepwd/${pwd}`,"", getTokenOptions(null))
    .map(response => response.json()).toPromise();
  }

}