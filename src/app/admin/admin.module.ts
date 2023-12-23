import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { ManageProgramsComponent } from './manage-programs/manage-programs.component';
import { ManagePlanComponent } from './manage-plan/manage-plan.component';
import { ManageEducationPeriodComponent } from './manage-education-period/manage-education-period.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

@NgModule({
  declarations: [
    IndexComponent,
    ManageProgramsComponent,
    ManagePlanComponent,
    ManageEducationPeriodComponent,
    ManageCoursesComponent,
    ManageRoleComponent,
    ManageUsersComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  exports: [],
})
export class AdminModule {}
