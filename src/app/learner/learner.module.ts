import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnerRoutingModule } from './learner-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { EnrolledProgramsComponent } from './enrolled-programs/enrolled-programs.component';
import { UserAttendenceComponent } from './user-attendence/user-attendence.component';
import { UserExamsComponent } from './user-exams/user-exams.component';
import { UserAssignmnetsComponent } from './user-assignmnets/user-assignmnets.component';
import { UserEditProfileComponent } from './user-edit-profile/user-edit-profile.component';
import { UserCompletedProgramsComponent } from './user-completed-programs/user-completed-programs.component';
import { UserTestimonialComponent } from './user-testimonial/user-testimonial.component';
import { UserCoursesComponent } from './user-courses/user-courses.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { CollapsibleComponent } from './collapsible/collapsible.component';
import { TopStudentsComponent } from './top-students/top-students.component';
import { SectionAnnouncementsComponent } from './section-announcements/section-announcements.component';
import { CompletedCoursesComponent } from './completed-courses/completed-courses.component';
import { StudentReportComponent } from './student-report/student-report.component';
import { CartComponent } from './cart/cart.component';
import { CartDetailsComponent } from './cart/cart-details/cart-details.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    EnrolledProgramsComponent,
    UserAttendenceComponent,
    UserExamsComponent,
    UserAssignmnetsComponent,
    UserEditProfileComponent,
    UserCompletedProgramsComponent,
    UserTestimonialComponent,
    UserCoursesComponent,
    CourseContentComponent,
    CollapsibleComponent,
    TopStudentsComponent,
    SectionAnnouncementsComponent,
    CompletedCoursesComponent,
    StudentReportComponent,
    CartComponent,
    CartDetailsComponent,
    CheckoutComponent,
  ],
  imports: [CommonModule, LearnerRoutingModule, SharedModule],
})
export class LearnerModule {}
