import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OrderComponent } from './order.component';
import { OrderRoutingModule } from "./order-routing.module";
import { OrderListComponent } from './order-list/order-list.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderService } from './order-service/order.service';
import { ProductionService } from '../production/service/production.service';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [ SharedModule,OrderRoutingModule],
  declarations: [
      OrderComponent,
      OrderListComponent,
      OrderFormComponent
  ],
  providers: [
    OrderService,
    ProductionService
  ]
})
export class OrderModule { }
