import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { ManageProgramsComponent } from './manage-programs/manage-programs.component';
import { ManagePlanComponent } from './manage-plan/manage-plan.component';
import { ManageEducationPeriodComponent } from './manage-education-period/manage-education-period.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { BadgeComponent } from './badge/badge.component';
import { CuoponComponent } from './coupon/cuopon.component';
import { PointsComponent } from './points/points.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    IndexComponent,
    ManageProgramsComponent,
    ManagePlanComponent,
    ManageEducationPeriodComponent,
    ManageCoursesComponent,
    BadgeComponent,
    CuoponComponent,
    PointsComponent,
    MessageComponent
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  exports: [],
})
export class AdminModule {}
