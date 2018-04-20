import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { DictRoutingModule } from './dict-routing.module';

import { DictComponent } from './dict.component';
import { DictListComponent } from './list/list.component';
import { DictFormComponent } from './form/form.component';

@NgModule({
  imports: [ SharedModule, DictRoutingModule ],
  declarations: [
    DictComponent,
    DictListComponent,
    DictFormComponent
  ]
})
export class DictModule { }
