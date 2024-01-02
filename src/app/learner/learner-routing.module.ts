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
import { CompletedCoursesComponent } from './completed-courses/completed-courses.component';
import { StudentReportComponent } from './student-report/student-report.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { LearnerExamComponent } from './learner-exam/learner-exam.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: 'userDashboard', component: UserDashboardComponent },
  { path: 'enrolledPrograms', component: EnrolledProgramsComponent },
  { path: 'userAttendence', component: UserAttendenceComponent },
  { path: 'userExams', component: UserExamsComponent },
  { path: 'userAssignments', component: UserAssignmnetsComponent },
  { path: 'userEditProfile', component: UserEditProfileComponent },
  { path: 'userCompletedPrograms', component: UserCompletedProgramsComponent },
  { path: 'userTestimonial', component: UserTestimonialComponent },
  { path: 'userCourses/:programId', component: UserCoursesComponent },
  { path: 'courseContent/:courseId', component: CourseContentComponent },
  { path: 'completedCourses', component: CompletedCoursesComponent },
  { path: 'studentReport', component: StudentReportComponent },
  { path: 'orders', component: OrdersComponent },

  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'testimonial',
    component: TestimonialComponent,
  },
  { path: 'exam/:examid', component: LearnerExamComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnerRoutingModule {}
