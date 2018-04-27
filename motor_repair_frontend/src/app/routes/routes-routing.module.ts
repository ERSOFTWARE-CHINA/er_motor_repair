import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
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
// import { CallbackComponent } from './callback/callback.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';

import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { ACLGuard } from './acl.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'passport',
        pathMatch: 'full'
    },
    // {
	// 	path: 'login',
	// 	component: LoginComponent
    // },
    {
        path: '',
        component: LayoutDefaultComponent,
        children: [
            { path: '', redirectTo: 'dashboard/v1', pathMatch: 'full' },
            { path: 'dashboard', redirectTo: 'dashboard/v1', pathMatch: 'full' },
            { path: 'dashboard/v1', component: DashboardV1Component, data: { translate: 'dashboard_v1' } },
            { path: 'dashboard/analysis', component: DashboardAnalysisComponent, data: { translate: 'dashboard_analysis' } },
            { path: 'dashboard/monitor', component: DashboardMonitorComponent, data: { translate: 'dashboard_monitor' } },
            { path: 'dashboard/workplace', component: DashboardWorkplaceComponent, data: { translate: 'dashboard_workplace' } },
            { path: 'dict', loadChildren: './dictionary/dict.module#DictModule' },
            { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
            { path: 'users', loadChildren: './users/users.module#UsersModule' },
            { path: 'roles', loadChildren: './roles/roles.module#RoleModule' },
            { path: 'orders', loadChildren: './order/order.module#OrderModule' },
            { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule', data: {roles: ['root']}, canActivate: [ACLGuard]},
            { path: 'project_users', loadChildren: './project_users/users.module#UsersModule', data: {roles: ['root']}, canActivate: [ACLGuard] },
            {path : 'productions',loadChildren: './production/production.module#ProductionModule'},
            {path : 'spareparts',loadChildren: './sparepart/sparepart.module#SparepartModule'},
            {path : 'purchases',loadChildren: './purchase/purchase.module#PurchaseModule'},
            {path : 'carMessage',loadChildren: './carMessage/carMessage.module#CarMessageModule'}
        ],
        canActivate: [AuthGuard]
    },
    // 全屏布局
    // {
    //     path: 'data-v',
    //     component: LayoutFullScreenComponent,
    //     children: [
    //         { path: '', loadChildren: './data-v/data-v.module#DataVModule' }
    //     ]
    // },
    // passport
    {
        path: 'passport',
        component: LayoutPassportComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: UserLoginComponent },
            { path: 'register', component: UserRegisterComponent },
            { path: 'register-result', component: UserRegisterResultComponent }
        ]
    },
    // 单页不包裹Layout
    // { path: 'callback/:type', component: CallbackComponent },
    { path: '403', component: Exception403Component },
    { path: '404', component: Exception404Component },
    { path: '500', component: Exception500Component },
    // { path: '**', redirectTo: 'dashboard' },

    {
		path: '**', // fallback router must in the last
		component: LayoutPassportComponent
	}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
    exports: [RouterModule]
})
export class RouteRoutingModule { }
