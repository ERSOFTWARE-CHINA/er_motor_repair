import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleComponent } from './roles.component';
import { RoleListComponent } from './list/list.component';
import { RoleFormComponent } from './form/form.component';

const routes: Routes = [{ 
    path: '', 
    component: RoleComponent,
    children: [
      { path: '', redirectTo: 'page', pathMatch: 'full' },
      { path: 'page', component: RoleListComponent} ,
      { path: 'form', component: RoleFormComponent },
    ]
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RoleRoutingModule { }
