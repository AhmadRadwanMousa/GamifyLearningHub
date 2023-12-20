import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { ManagePlanComponent } from './manage-plan/manage-plan.component';
import { ManageEducationPeriodComponent } from './manage-education-period/manage-education-period.component';

@NgModule({
  declarations: [
    IndexComponent,
    ManagePlanComponent,
    ManageEducationPeriodComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  exports: [],
})
export class AdminModule {}
