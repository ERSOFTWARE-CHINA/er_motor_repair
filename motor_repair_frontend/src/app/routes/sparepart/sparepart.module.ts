import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { SparepartRoutingModule } from './sparepart-routing.module';

import { SparepartComponent } from './sparepart.component';
import { SparepartListComponent } from './sparepart-list/sparepart-list.component';
import { SparepartFormComponent } from './sparepart-form/sparepart-form.component';
// import { SparepartService } from './service/sparepart.service';
import { RolesService } from '../roles/service/roles.service';
import { MainPipe } from '../../pipes/pipes.module';

@NgModule({
  imports: [ SharedModule, SparepartRoutingModule, MainPipe ],
  declarations: [
    SparepartComponent,
    SparepartListComponent,
    SparepartFormComponent
  ],
  providers: [
    // SparepartService
    // ConfirmationService
  ]
})
export class SparepartModule { }

