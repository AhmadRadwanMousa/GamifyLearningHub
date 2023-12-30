import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { ManageExamsComponent } from './manage-exams/manage-exams.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { ManageAssignmentsComponent } from './manage-assignments/manage-assignments.component';
import { BrowserModule } from '@angular/platform-browser';
import { ManageAssignmentSolutionComponent } from './manage-assignment-solution/manage-assignment-solution.component';
import { ManageMaterialComponent } from './manage-material/manage-material.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ManageAttendenceComponent } from './manage-attendence/manage-attendence.component';

@NgModule({
  declarations: [
    IndexComponent,
    ManageAssignmentsComponent,
    ManageAssignmentSolutionComponent,
    ManageMaterialComponent,
    ManageExamsComponent,
    QuestionFormComponent,
    ManageAttendenceComponent,
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
  ],
})
export class InstructorModule {}
