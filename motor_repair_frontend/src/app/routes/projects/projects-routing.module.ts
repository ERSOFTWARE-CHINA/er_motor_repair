import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { ProjectsListComponent } from './list/list.component';
import { ProjectsFormComponent } from './form/form.component';

const routes: Routes = [{
    path: '',
	component: ProjectsComponent,
	children: [
		{ path: '', redirectTo: 'page', pathMatch: 'full' },
		{ path: 'page', component: ProjectsListComponent },
		{ path: 'form', component: ProjectsFormComponent },
	]
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProjectsRoutingModule { }