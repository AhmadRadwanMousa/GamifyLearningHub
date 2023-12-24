import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ManagePlanComponent } from './manage-plan/manage-plan.component';
import { ManageEducationPeriodComponent } from './manage-education-period/manage-education-period.component';
import { ManageProgramsComponent } from './manage-programs/manage-programs.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { BadgeComponent } from './badge/badge.component';
import { PointsComponent } from './points/points.component';
import { CuoponComponent } from './coupon/cuopon.component';
import { MessageComponent } from './message/message.component';
import { ManageSectionComponent } from './manage-section/manage-section.component';
import { ManageUserSectionComponent } from './manage-user-section/manage-user-section.component';
import { ManageCourseSequenceComponent } from './manage-course-sequence/manage-course-sequence.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageTestimonialsComponent } from './manage-testimonials/manage-testimonials.component';

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
  { path: 'manageUserSection', component: ManageUserSectionComponent },

  {
    path: 'course-sequence/:programid',
    component: ManageCourseSequenceComponent,
  },

  { path: 'user', component: ManageUsersComponent },

  { path: 'testimonial', component: ManageTestimonialsComponent },

  {
     path: 'manageCourses', component: ManageCoursesComponent 
  },
  {
    path: 'badge', component:BadgeComponent
  },
  {
    path: 'Points',component :PointsComponent
  },
  {
    path:'Cuopon',component:CuoponComponent
  },
  {
    path: 'messages',
    component: MessageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
