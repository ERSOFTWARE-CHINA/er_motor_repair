import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ProductionStockin } from '../domain/production_stockin.domain';
import { baseUrl } from '../../../shared/shared.service';
import { getTokenOptions } from '../../pages/login/login.service';

@Injectable()
export class ProductionStockinService {

  constructor(private http: Http) {}
   
  url = baseUrl+"production_stockin"

  listOnePage(q) {
    return this.http.get(this.url, getTokenOptions(q))
               .toPromise().then(res => {return res.json()})           
  }

  add(v): Promise<any>{ 
    v.production = {id: v.production_id};
    v.order = {id: v.order_id}
    let param = { production_stockin: v}; 
    return this.http.post(this.url, param, getTokenOptions(null))
               .map(response => response.json()).toPromise();
  }

    delete(id: any) {
        return this.http.delete(this.url + `/${id}`, getTokenOptions(null))
                   .map(response => response.json())
                   .toPromise();
    }

  isUpdate = false;
  isAudit = false;

  formOperation = 'create';
  productionStockin : ProductionStockin = null;

  //获取用户对象将提供给修改页面Form使用
  initUpdate(id){

    return this.http.get(this.url + `/${id}`, getTokenOptions(null))
               .map(response => response.json()).toPromise();
  }

  update(id, v): Promise<any>{
    v.production = {id: v.production_id};
    v.order = {id: v.order_id}
    let param = { production_stockin: v}; 
    return this.http.put(this.url + `/${id}`,param, getTokenOptions(null))
               .map(response => response.json()).toPromise();
  }

  checkNoAlreadyExists(obj) {
    return this.http.get(baseUrl + `production_stockins/check/no`, getTokenOptions(obj)).map(response => response.json()).toPromise();
  }

}