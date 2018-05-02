import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { StaffRoutingModule } from './staffs-routing.module';

import { StaffComponent } from './staffs.component';
import { StaffListComponent } from './list/list.component';
import { StaffFormComponent } from './form/form.component';
import { StaffsService } from './service/staffs.service';
import { MainPipe } from '../../pipes/pipes.module';

@NgModule({
  imports: [ SharedModule, StaffRoutingModule , MainPipe],
  declarations: [
    StaffComponent,
    StaffListComponent,
    StaffFormComponent
  ],
  providers: [StaffsService]
})
export class StaffModule { }
