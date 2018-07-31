import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarMessageComponent } from './carMessage.component';
import { CarMessageListComponent } from './list/list.component';
import { CarMessageRemindingListComponent } from './reminding_list/list.component';
import { CarMessageFormComponent } from './form/form.component';

const routes: Routes = [{
    path: '',
	component: CarMessageComponent,
	children: [
		{ path: '', redirectTo: 'page', pathMatch: 'full' },
		{ path: 'page', component: CarMessageListComponent },
		{ path: 'form', component: CarMessageFormComponent },
		{ path: 'reminding_list', component: CarMessageRemindingListComponent },
	]
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CarMessageRoutingModule { }






