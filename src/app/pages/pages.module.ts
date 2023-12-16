import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ProgramsComponent } from './programs/programs.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProgramsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule ,
    SharedModule
  ],

})
export class PagesModule { }
