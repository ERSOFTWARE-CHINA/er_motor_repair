import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Order } from '../order-domain/order.domain';
import { baseUrl } from '../../../shared/shared.service';
import { getTokenOptions } from '../../pages/login/login.service';

@Injectable()
export class OrderService {

  constructor(private http: Http) {}
   
  url = baseUrl+"orders"

  isUpdate = false;

  formOperation = 'create';
  order : Order = null;

  listOnePage(q) {
    return this.http.get(this.url, getTokenOptions(q))
               .toPromise().then(res => {return res.json()})           
  }

  listAll() {
    return this.http.get(this.url+`?page_size=1024`, getTokenOptions(null))
               .toPromise().then(res => {return res.json()})           
  }

  add(v): Promise<any>{ 
    let param = { order: v} 
    return this.http.post(this.url, param, getTokenOptions(null))
               .map(response => response.json()).toPromise();
  }

  initUpdate(id){
    return this.http.get(this.url + `/${id}`, getTokenOptions(null))
               .map(response => response.json()).toPromise();
  }

  update(cid, v): Promise<any>{
    let obj = { role: v} 
    return this.http.put(this.url + `/${cid}`,obj, getTokenOptions(null))
               .map(response => response.json()).toPromise();
  }

  delete(id: any) {
    return this.http.delete(this.url + `/${id}`, getTokenOptions(null))
               .map(response => response.json())
               .toPromise();
  }
  
}