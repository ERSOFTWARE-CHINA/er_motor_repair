import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { RepairInfoRoutingModule } from './repair_info-routing.module';

import { RepairInfoComponent } from './repair_info.component';
import { RepairInfoListComponent } from './list/list.component';
import { RepairInfoFormComponent } from './form/form.component';

import { MainPipe } from '../../pipes/pipes.module';

@NgModule({
  imports: [ SharedModule, RepairInfoRoutingModule, MainPipe ],
  declarations: [
    RepairInfoComponent,
    RepairInfoListComponent,
    RepairInfoFormComponent
  ],
  providers: [
  ]
})
export class RepairInfoModule { }