import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DictComponent } from './dict.component';
import { DictListComponent } from './list/list.component';
import { DictFormComponent } from './form/form.component';

const routes: Routes = [{ 
    path: '', 
    component: DictComponent,
    children: [
      { path: '', redirectTo: 'page', pathMatch: 'full', data: { translate: 'dashboard_analysis' }  },
      { path: 'page', component: DictListComponent, data: { translate: 'dashboard_analysis' }  },
      { path: 'form', component: DictFormComponent },
    ],
    data: { translate: 'dashboard_analysis' } 
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DictRoutingModule { }
