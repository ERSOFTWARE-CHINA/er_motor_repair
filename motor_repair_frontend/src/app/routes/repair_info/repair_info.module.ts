import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { RepairInfoRoutingModule } from './repair_info-routing.module';

import { RepairInfoComponent } from './repair_info.component';
import { RepairInfoListComponent } from './list/list.component';
import { RepairInfoFormComponent } from './form/form.component';
import { RepairInfoService } from './service/repair_info.service';

@NgModule({
  imports: [ SharedModule, RepairInfoRoutingModule ],
  declarations: [
    RepairInfoComponent,
    RepairInfoListComponent,
    RepairInfoFormComponent
  ],
  providers: [
    RepairInfoService
  ]
})
export class RepairInfoModule { }