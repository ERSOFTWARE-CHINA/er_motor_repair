import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { RepairInfo } from '../domain/repair_info.domain';
import { CarMessage } from '../../carMessage/domain/carMessage.domain';
import { baseUrl } from '../../../shared/shared.service';
import { getTokenOptions } from '../../pages/login/login.service';

@Injectable()
export class RepairInfoService {

    constructor(private http: Http) {}
    
    url = baseUrl+"repair_info"

    listOnePage(q) {
        return this.http.get(this.url, getTokenOptions(q))
                   .toPromise().then(res => {return res.json()})           
    }

    add(v): Promise<any>{ 
        v.car_message = {id: this.carMessage.id}
        let param = { repair_info: v} 
        return this.http.post(this.url, param, getTokenOptions(null))
                   .map(response => response.json()).toPromise();
    }

    delete(id: any) {
        return this.http.delete(this.url + `/${id}`, getTokenOptions(null))
                   .map(response => response.json())
                   .toPromise();
    }

    generateNo(){
        return this.http.get(baseUrl+"repair_info_gen_no", getTokenOptions(null))
                   .toPromise().then(res => {return res.json()})     
    }

    isUpdate = false;
    formOperation = 'create';
    carMessage : CarMessage = null;
    repairInfo : RepairInfo = null;

    initUpdate(id){
        return this.http.get(this.url + `/${id}`, getTokenOptions(null))
                .map(response => response.json()).toPromise();
    }

    update(cid, v): Promise<any>{
        v.order = {id: v.order}
        let param = { repair_info: v} 
        return this.http.put(this.url + `/${cid}`,param, getTokenOptions(null))
                .map(response => response.json()).toPromise();
    }


}