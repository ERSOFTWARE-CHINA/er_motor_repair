import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionModule } from './production.module';
import { ProductionListComponent } from './production-list/production-list.component';
import { ProductionFormComponent } from './production-form/production-form.component';


const routes: Routes = [{ 
  path: '', 
  children: [
      { path: '', redirectTo: 'page', pathMatch: 'full' },
      { path: 'page', component: ProductionListComponent },
      { path: 'form', component: ProductionFormComponent }
  ]
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ProductionRoutingModule { }
