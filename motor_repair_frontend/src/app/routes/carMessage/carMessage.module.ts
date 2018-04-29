import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { CarMessageRoutingModule } from './carMessage-routing.module';

import { CarMessageComponent } from './carMessage.component';
import { CarMessageListComponent } from './list/list.component';
import { CarMessageFormComponent } from './form/form.component';
import { MainPipe } from '../../pipes/pipes.module';

@NgModule({
  imports: [ SharedModule, CarMessageRoutingModule, MainPipe ],
  declarations: [
    CarMessageComponent,
    CarMessageListComponent,
    CarMessageFormComponent
  ],
  providers: [
    
  ]
})
export class CarMessageModule { }

