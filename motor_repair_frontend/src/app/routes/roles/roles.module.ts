import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { RoleRoutingModule } from './roles-routing.module';

import { RoleComponent } from './roles.component';
import { RoleListComponent } from './list/list.component';
import { RoleFormComponent } from './form/form.component';
import { RolesService } from './service/roles.service';

@NgModule({
  imports: [ SharedModule, RoleRoutingModule ],
  declarations: [
    RoleComponent,
    RoleListComponent,
    RoleFormComponent
  ],
  providers: [RolesService]
})
export class RoleModule { }
