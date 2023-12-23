import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ManagePlanComponent } from './manage-plan/manage-plan.component';
import { ManageEducationPeriodComponent } from './manage-education-period/manage-education-period.component';
import { ManageProgramsComponent } from './manage-programs/manage-programs.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { ManageSectionComponent } from './manage-section/manage-section.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
  },
  { path: 'role', component: ManageRoleComponent },
  { path: 'section', component: ManageSectionComponent },
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
