import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router,public aclSrv: ACLService,private menuSrv: MenuService) { }
 
    canActivate() {
        // if (localStorage.getItem('currentToken')) {
        //     return true;
        // }
        // this.router.navigate(['/login']);
        // return false;
        return true
    }

}