import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { VinSparePartRoutingModule } from './vin_sparepart-routing.module';

import { VinSparePartComponent } from './vin _sparepart.component';
import { VinSparePartListComponent } from './list/list.component';
import { VinSparePartFormComponent } from './form/form.component';
import { VinSparePartService } from './service/vin_sparepart.service';

@NgModule({
  imports: [ SharedModule, VinSparePartRoutingModule ],
  declarations: [
    VinSparePartComponent,
    VinSparePartListComponent,
    VinSparePartFormComponent
  ],
  providers: [
    VinSparePartService
  ]
})
export class VinSparePartModule { }

