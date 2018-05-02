import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffComponent } from './staffs.component';
import { StaffListComponent } from './list/list.component';
import { StaffFormComponent } from './form/form.component';

const routes: Routes = [{ 
    path: '', 
    component: StaffComponent,
    children: [
      { path: '', redirectTo: 'page', pathMatch: 'full' },
      { path: 'page', component: StaffListComponent} ,
      { path: 'form', component: StaffFormComponent },
    ]
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class StaffRoutingModule { }
