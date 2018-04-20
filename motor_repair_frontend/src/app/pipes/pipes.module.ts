import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {UserStatusPipe} from "./pipes";

@NgModule({
  declarations:[UserStatusPipe],
  imports:[CommonModule],
  exports:[UserStatusPipe]
})

export class MainPipe{}