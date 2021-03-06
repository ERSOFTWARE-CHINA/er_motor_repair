import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardV1Component } from './dashboard/v1/v1.component';
// passport pages
// import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
// import { CallbackComponent } from './callback/callback.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';
import { BillComponent } from './pages/bill/bill.component';
// import { UsersListComponent } from './users/list/list.component';
import { UserLoginComponent } from './passport/login/login.component';
import { AuthenticationService } from './passport/service/login.service';

import { RegisterService } from './passport/service/register.service';
import { CarMessageService } from './carMessage/service/carMessage.service';
import { RepairInfoService } from './repair_info/service/repair_info.service'; 

import { StaffsService } from './staffs/service/staffs.service'; 
import { SparepartService } from './sparepart/service/sparepart.service';

import { MainPipe } from '../pipes/pipes.module';


@NgModule({
    imports: [ SharedModule, RouteRoutingModule, MainPipe ],
    declarations: [
        DashboardV1Component,
        // passport pages
        UserLoginComponent,
        UserRegisterComponent,
        UserRegisterResultComponent,
        // single pages
        // CallbackComponent,
        Exception403Component,
        Exception404Component,
        Exception500Component,
        BillComponent
        // LoginComponent
        // UsersListComponent
    ],
    providers: [ AuthenticationService, RegisterService, CarMessageService, RepairInfoService, SparepartService ]
})

export class RoutesModule {}
