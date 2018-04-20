import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';


import { PurchaseComponent } from './purchase.component';
import { PurchaseFormComponent } from './form/form.component';
import { PurchaseListComponent } from './list/list.component';
import { PurchaseRoutes} from './purchase.routes';

import { PurchaseService } from './service/purchase.service';
import { OrderService } from '../order/order-service/order.service';
import { SparepartService } from '../sparepart/service/sparepart.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(PurchaseRoutes)
  ],
  declarations: [
    PurchaseComponent,
    PurchaseFormComponent,
    PurchaseListComponent
  ],
  providers: [
    PurchaseService,
    OrderService,
    SparepartService
  ]
})
export class PurchaseModule { }