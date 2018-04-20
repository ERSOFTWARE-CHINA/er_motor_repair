import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Purchase } from '../domain/purchase.domain';
import { baseUrl } from '../../../shared/shared.service';
import { getTokenOptions } from '../../pages/login/login.service';

@Injectable()
export class PurchaseService {

    constructor(private http: Http) {}
    
    url = baseUrl+"purchases"

    listOnePage(q) {
        return this.http.get(this.url, getTokenOptions(q))
                   .toPromise().then(res => {return res.json()})           
    }

    add(v): Promise<any>{ 
        v.order = {id: v.order}
        let param = { purchase: v} 
        return this.http.post(this.url, param, getTokenOptions(null))
                   .map(response => response.json()).toPromise();
    }

    delete(id: any) {
        return this.http.delete(this.url + `/${id}`, getTokenOptions(null))
                   .map(response => response.json())
                   .toPromise();
    }

    isUpdate = false;
    formOperation = 'create';
    purchase : Purchase = null;

    initUpdate(id){
        return this.http.get(this.url + `/${id}`, getTokenOptions(null))
                .map(response => response.json()).toPromise();
    }

    update(cid, v): Promise<any>{
        v.order = {id: v.order}
        let param = { purchase: v} 
        return this.http.put(this.url + `/${cid}`,param, getTokenOptions(null))
                .map(response => response.json()).toPromise();
    }


}