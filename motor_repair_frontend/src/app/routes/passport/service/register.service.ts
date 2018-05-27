import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { baseUrl } from '../../../shared/shared.service';
 
@Injectable()
export class RegisterService {
    public token: string;
 
    constructor(private http: Http) {}

    registeredName = null;

    register(v) {
        v.project = {name: v.project, province: v.province, city: v.city}
        let params = {user: v}
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(baseUrl + `register`, params, options).toPromise().then(res => {return res.json()})
    }
 
    checkProjectAlreadyExists(username) {
        return this.http.get(baseUrl + `users/username/${username}`).map(response => response.json()).toPromise();

    }

    sendMessage(url) {
        return this.http.get(url).toPromise()
    }

}

    