import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { ProductionStockinRoutingModule } from './production_stockin-routing.module';

import { ProductionStockinComponent } from './production_stockin.component';
import { ProductionStockinListComponent } from './list/list.component';
import { ProductionStockinFormComponent } from './form/form.component';
import { ProductionStockinService } from './service/production_stockin.service';
import { ProductionService } from '../production/service/production.service';
import { OrderService } from '../order/order-service/order.service';
import { MainPipe } from '../../pipes/pipes.module';

@NgModule({
  imports: [ SharedModule, ProductionStockinRoutingModule, MainPipe ],
  declarations: [
    ProductionStockinComponent,
    ProductionStockinListComponent,
    ProductionStockinFormComponent
  ],
  providers: [
    ProductionStockinService,
    OrderService,
    ProductionService
    // ConfirmationService
  ]
})
export class ProductionStockinModule { }

