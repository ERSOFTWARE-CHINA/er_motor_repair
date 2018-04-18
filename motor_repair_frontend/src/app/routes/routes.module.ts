import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardV1Component } from './dashboard/v1/v1.component';
import { DashboardAnalysisComponent } from './dashboard/analysis/analysis.component';
import { DashboardMonitorComponent } from './dashboard/monitor/monitor.component';
import { DashboardWorkplaceComponent } from './dashboard/workplace/workplace.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { UserLockComponent } from './passport/lock/lock.component';


@NgModule({
    imports: [ SharedModule, RouteRoutingModule ],
    declarations: [
        DashboardV1Component,
        DashboardAnalysisComponent,
        DashboardMonitorComponent,
        DashboardWorkplaceComponent,
        // passport pages
        UserLoginComponent,
        UserRegisterComponent,
        UserRegisterResultComponent,
        // single pages
        UserLockComponent,

    ]
})

export class RoutesModule {}
