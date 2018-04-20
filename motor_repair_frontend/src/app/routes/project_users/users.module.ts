import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent } from './users.component';
import { UsersListComponent } from './list/list.component';
import { UsersFormComponent } from './form/form.component';
import { UsersService } from './service/users.service';
import { RolesService } from '../roles/service/roles.service';
import { ProjectsService } from '../projects/service/projects.service';
import { MainPipe } from '../../pipes/pipes.module';

@NgModule({
  imports: [ SharedModule, UsersRoutingModule, MainPipe ],
  declarations: [
    UsersComponent,
    UsersListComponent,
    UsersFormComponent
  ],
  providers: [
    UsersService,
    RolesService,
    ProjectsService
    // ConfirmationService
  ]
})
export class UsersModule { }

