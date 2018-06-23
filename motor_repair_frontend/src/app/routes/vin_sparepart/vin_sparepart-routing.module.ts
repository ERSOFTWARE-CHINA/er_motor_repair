import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VinSparePartComponent } from './vin _sparepart.component';
import { VinSparePartListComponent } from './list/list.component';
import { VinSparePartFormComponent } from './form/form.component';

const routes: Routes = [{
    path: '',
    component: VinSparePartComponent,
    children: [
      { path: '', redirectTo: 'page', pathMatch: 'full' },
      { path: 'page', component: VinSparePartListComponent },
      { path: 'form', component: VinSparePartFormComponent },
    ]
}];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class VinSparePartRoutingModule { }






