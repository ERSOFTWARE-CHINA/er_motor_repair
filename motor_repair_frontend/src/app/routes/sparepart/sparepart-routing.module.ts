import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

import { SparepartListComponent } from "./sparepart-list/sparepart-list.component";
import { SparepartFormComponent } from "./sparepart-form/sparepart-form.component";


const routes: Routes = [{ 
  path: '', 
  children: [
    { path: '', redirectTo: 'page', pathMatch: 'full' },
      { path: 'page', component:  SparepartListComponent},
      { path: 'form', component:  SparepartFormComponent},
  ]
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class SparepartRoutingModule { }
