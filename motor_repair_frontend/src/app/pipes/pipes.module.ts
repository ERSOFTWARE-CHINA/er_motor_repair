import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {UserStatusPipe} from "./pipes";
import {StaffStatusPipe} from "./pipes";
import {SexPipe} from "./pipes";

@NgModule({
  declarations:[UserStatusPipe,StaffStatusPipe,SexPipe],
  imports:[CommonModule],
  exports:[UserStatusPipe,StaffStatusPipe,SexPipe]
})

export class MainPipe{}