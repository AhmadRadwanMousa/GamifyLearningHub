import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { ManageRoleComponent } from './manage-role/manage-role.component';







@NgModule({
  declarations: [
    IndexComponent,
    ManageRoleComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,


   
    
  ]
})
export class AdminModule { }
