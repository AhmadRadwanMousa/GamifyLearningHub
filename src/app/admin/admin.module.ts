import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { ManageProgramsComponent } from './manage-programs/manage-programs.component';
import { ManagePlanComponent } from './manage-plan/manage-plan.component';
import { ManageEducationPeriodComponent } from './manage-education-period/manage-education-period.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { ManageCourseSequenceComponent } from './manage-course-sequence/manage-course-sequence.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ManageSectionComponent } from './manage-section/manage-section.component';

import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageUserSectionComponent } from './manage-user-section/manage-user-section.component';
import { ManageTestimonialsComponent } from './manage-testimonials/manage-testimonials.component';
import { BadgeComponent } from './badge/badge.component';
import { CuoponComponent } from './coupon/cuopon.component';
import { PointsComponent } from './points/points.component';
import { MessageComponent } from './message/message.component';
import { ManageUserStatusComponent } from './manage-user-status/manage-user-status.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';

@NgModule({
  declarations: [
    IndexComponent,
    ManageProgramsComponent,
    ManagePlanComponent,
    ManageEducationPeriodComponent,
    ManageCoursesComponent,
    ManageCourseSequenceComponent,
    ManageRoleComponent,
    ManageSectionComponent,
    ManageUsersComponent,
    ManageUserSectionComponent,
    ManageTestimonialsComponent,
    BadgeComponent,
    CuoponComponent,
    PointsComponent,
    MessageComponent,
    ManageUserStatusComponent,
    AdminReportComponent,
    LeaderBoardComponent
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  exports: [],
})
export class AdminModule {}
