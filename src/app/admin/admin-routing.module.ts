import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ManagePlanComponent } from './manage-plan/manage-plan.component';
import { ManageEducationPeriodComponent } from './manage-education-period/manage-education-period.component';
import { ManageProgramsComponent } from './manage-programs/manage-programs.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { ManageUserSectionComponent } from './manage-user-section/manage-user-section.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
  },
  {
    path: 'plan',
    component: ManagePlanComponent,
  },
  {
    path: 'educationalPeriod',
    component: ManageEducationPeriodComponent,
  },
  {
    path: 'programs',
    component: ManageProgramsComponent,
  },
  { path: 'manageCourses', component: ManageCoursesComponent },
  { path: 'manageUserSection', component: ManageUserSectionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
