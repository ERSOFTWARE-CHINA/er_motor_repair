import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';

import { baseUrl } from '../../../shared/shared.service';
 
@Injectable()
export class RegisterService {
    public token: string;
 
    constructor(private http: Http) {}

    register(v) {
        v.project = {project: v.project}
        let params = {user: v}
        console.log(params)
    }
 
    checkProjectAlreadyExists(username) {
        return this.http.get(baseUrl + `users/username/${username}`).map(response => response.json()).toPromise();

    }

}

    