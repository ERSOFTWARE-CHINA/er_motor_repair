import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';

import { baseUrl } from '../../../shared/shared.service';

export function getTokenOptions(paramsobj): RequestOptions{
    let headers = new Headers();
    let jwt = 'Bearer ' + localStorage.getItem('currentToken');
    headers.append('Authorization', jwt);
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params: paramsobj });
    return options;
}
 
@Injectable()
export class AuthenticationService {
    public token: string;
 
    constructor(private http: Http,public aclSrv: ACLService,private menuSrv: MenuService) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
 
    login(value): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(baseUrl + `login`, value, options)
            .map((response: Response) => {
                let error = response.json() && response.json().error;
                let token = response.json() && response.json().jwt;
                let username = response.json() && response.json().user && response.json().user.name;
                let mobile = response.json() && response.json().user && response.json().user.mobile;
                let perms = response.json() && response.json().perms;
                let avatar = response.json() && response.json().user && response.json().user.avatar;

              
                 if (!error && token && username && perms) {
                    this.token = token;
                    localStorage.clear();
                    localStorage.setItem('currentToken', token);
                    localStorage.setItem('currentUsername', username);
                    localStorage.setItem('currentPerms', perms);
                    localStorage.setItem('username', username);
                    localStorage.setItem('mobile', mobile)
                    localStorage.setItem('avatar', avatar)
                    this.setACL(response.json());
                    return true;
                } else {
                    return false;
                }
            });
    }

    setACL(obj){
        this.aclSrv.setFull(false);
        let acl: string[]= obj.perms.default;
        if (obj.user.is_root) {acl.push("root")};
        if (obj.user.is_admin) {acl.push("admin")};
        localStorage.setItem('acl', acl.join(','));
        this.aclSrv.setRole(acl);
        this.menuSrv.resume();
    }

    checkUsernameAlreadyExists(username) {
        return this.http.get(baseUrl + `users/username/${username}`).map(response => response.json()).toPromise();
    }

    checkEmailAlreadyExists(email) {
        return this.http.get(baseUrl + `users/email/${email}`, getTokenOptions(null)).map(response => response.json()).toPromise();
    }

    checkPassword(pwd) {
        return this.http.get(baseUrl + `users/checkpwd/${pwd}`, getTokenOptions(null))
                   .map(response => response.json()).toPromise();
    }

    sendMessage(url) {
        return this.http.get(url).toPromise()
    }

}

    