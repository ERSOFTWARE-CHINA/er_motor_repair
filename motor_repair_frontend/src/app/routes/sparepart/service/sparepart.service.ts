import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Sparepart } from '../domain/sparepart.domain';
import { baseUrl } from '../../../shared/shared.service';
import { getTokenOptions } from '../../pages/login/login.service';

@Injectable()
export class SparepartService {

  constructor(private http: Http) {}
   
  url = baseUrl + "spareparts"

  isUpdate = false;

  formOperation = 'create';
  
  sparepart : Sparepart = null;

  listOnePage(q) {
    return this.http.get(this.url, getTokenOptions(q))
               .toPromise().then(res => {return res.json()})           
  }

  // 所有角色不超过64个
  listAll() {
    return this.http.get(this.url+`?page_size=64`, getTokenOptions(null))
               .toPromise().then(res => {return res.json()})           
  }

  add(v): Promise<any>{ 
    let param = { sparepart: v} 
    return this.http.post(this.url, param, getTokenOptions(null))
               .map(response => response.json()).toPromise();
  }

  initUpdate(id){
    return this.http.get(this.url + `/${id}`, getTokenOptions(null))
               .map(response => response.json()).toPromise();
  }

  update(cid, v): Promise<any>{
    let obj = { sparepart: v} 
    return this.http.put(this.url + `/${cid}`,obj, getTokenOptions(null))
               .map(response => response.json()).toPromise();
  }

  delete(id: any) {
    return this.http.delete(this.url + `/${id}`, getTokenOptions(null))
               .map(response => response.json())
               .toPromise();
  }

  checkNameAlreadyExists(obj) {
    return this.http.get(baseUrl + `spareparts/check/name`, getTokenOptions(obj)).map(response => response.json()).toPromise();
  }
  
}