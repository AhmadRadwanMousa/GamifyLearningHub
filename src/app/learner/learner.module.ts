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
import { TestimonialComponent } from './testimonial/testimonial.component';
import { OrdersComponent } from './orders/orders.component';
import { LearnerExamComponent } from './learner-exam/learner-exam.component';
import { MarkExamComponent } from './mark-exam/mark-exam.component';
import { UserCouponsComponent } from './user-coupons/user-coupons.component';
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
    TestimonialComponent,
    LearnerExamComponent,
    OrdersComponent,
    MarkExamComponent,
    UserCouponsComponent,
  ],
  imports: [CommonModule, LearnerRoutingModule, SharedModule],
})
export class LearnerModule {}
