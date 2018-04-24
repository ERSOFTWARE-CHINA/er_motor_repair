import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';

import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';
 
@Injectable()
export class ACLGuard implements CanActivate {
 
    constructor(private router: Router,public aclSrv: ACLService,private menuSrv: MenuService) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let roles = route.data["roles"] as Array<string>;
        if (this.aclSrv.can(roles)) {
            return true;
        }
        this.router.navigate(['/passport/login']);
        return false;
    }

}