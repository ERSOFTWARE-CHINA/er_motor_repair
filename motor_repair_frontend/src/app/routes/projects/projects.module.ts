import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { ProjectsRoutingModule } from './projects-routing.module';

import { ProjectsComponent } from './projects.component';
import { ProjectsListComponent } from './list/list.component';
import { ProjectsFormComponent } from './form/form.component';
import { ProjectsService } from './service/projects.service';
import { RolesService } from '../roles/service/roles.service';
import { MainPipe } from '../../pipes/pipes.module';

@NgModule({
  imports: [ SharedModule, ProjectsRoutingModule, MainPipe ],
  declarations: [
    ProjectsComponent,
    ProjectsListComponent,
    ProjectsFormComponent
  ],
  providers: [
    ProjectsService,
    RolesService
  ]
})
export class ProjectsModule { }

