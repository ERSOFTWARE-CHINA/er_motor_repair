import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {UserStatusPipe} from "./pipes";
import {StaffStatusPipe} from "./pipes";
import {SexPipe} from "./pipes";
import {RepairInfoStatusPipe} from "./pipes";

@NgModule({
  declarations:[UserStatusPipe,StaffStatusPipe,SexPipe,RepairInfoStatusPipe],
  imports:[CommonModule],
  exports:[UserStatusPipe,StaffStatusPipe,SexPipe,RepairInfoStatusPipe]
})

export class MainPipe{}