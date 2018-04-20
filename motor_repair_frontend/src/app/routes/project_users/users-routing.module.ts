import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UsersListComponent } from './list/list.component';
import { UsersFormComponent } from './form/form.component';

const routes: Routes = [{
    path: '',
	component: UsersComponent,
	children: [
		{ path: '', redirectTo: 'page', pathMatch: 'full' },
		{ path: 'page', component: UsersListComponent },
		{ path: 'form', component: UsersFormComponent },
	]
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UsersRoutingModule { }






