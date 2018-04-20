import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { ProductionRoutingModule } from './production-routing.module';

import { ProductionComponent } from './production.component';
import { ProductionListComponent } from './production-list/production-list.component';
import { ProductionFormComponent } from './production-form/production-form.component';
import { ProductionService } from './service/production.service';
import { RolesService } from '../roles/service/roles.service';
import { MainPipe } from '../../pipes/pipes.module';

@NgModule({
  imports: [ SharedModule, ProductionRoutingModule, MainPipe ],
  declarations: [
    ProductionComponent,
    ProductionListComponent,
    ProductionFormComponent
  ],
  providers: [
    ProductionService
    // ConfirmationService
  ]
})
export class ProductionModule { }

