import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionStockinComponent } from './production_stockin.component';
import { ProductionStockinListComponent } from './list/list.component';
import { ProductionStockinFormComponent } from './form/form.component';

const routes: Routes = [{
    path: '',
	component: ProductionStockinComponent,
	children: [
		{ path: '', redirectTo: 'page', pathMatch: 'full' },
		{ path: 'page', component: ProductionStockinListComponent },
		{ path: 'form', component: ProductionStockinFormComponent },
	]
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProductionStockinRoutingModule { }






