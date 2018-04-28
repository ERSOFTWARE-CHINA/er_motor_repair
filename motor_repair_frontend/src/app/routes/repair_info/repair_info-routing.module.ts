import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepairInfoComponent } from './repair_info.component';
import { RepairInfoListComponent } from './list/list.component';
import { RepairInfoFormComponent } from './form/form.component';

const routes: Routes = [{
    path: '',
	component: RepairInfoComponent,
	children: [
		{ path: '', redirectTo: 'page', pathMatch: 'full' },
		{ path: 'page', component: RepairInfoListComponent },
		{ path: 'form', component: RepairInfoFormComponent },
	]
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RepairInfoRoutingModule { }