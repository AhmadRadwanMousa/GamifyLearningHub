import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { EnrolledProgramsComponent } from './enrolled-programs/enrolled-programs.component';
import { UserAttendenceComponent } from './user-attendence/user-attendence.component';
import { UserExamsComponent } from './user-exams/user-exams.component';
import { UserAssignmnetsComponent } from './user-assignmnets/user-assignmnets.component';
import { UserEditProfileComponent } from './user-edit-profile/user-edit-profile.component';
import { UserCompletedProgramsComponent } from './user-completed-programs/user-completed-programs.component';
import { UserTestimonialComponent } from './user-testimonial/user-testimonial.component';
import { UserCoursesComponent } from './user-courses/user-courses.component';
import { CourseContentComponent } from './course-content/course-content.component';

const routes: Routes = [
  { path: 'userDashboard', component:UserDashboardComponent },
  { path: 'enrolledPrograms', component:EnrolledProgramsComponent },
  { path: 'userAttendence', component:UserAttendenceComponent },
  { path: 'userExams', component:UserExamsComponent },
  { path: 'userAssignments', component:UserAssignmnetsComponent },
  { path: 'userEditProfile', component:UserEditProfileComponent },
  { path: 'userCompletedPrograms', component:UserCompletedProgramsComponent },
  { path: 'userTestimonial', component:UserTestimonialComponent },
  { path: 'userCourses', component:UserCoursesComponent },
  { path: 'courseContent', component:CourseContentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnerRoutingModule {}
