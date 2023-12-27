import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { ManageAssignmentsComponent } from './manage-assignments/manage-assignments.component';
import { BrowserModule } from '@angular/platform-browser';
import { ManageAssignmentSolutionComponent } from './manage-assignment-solution/manage-assignment-solution.component';

@NgModule({
  declarations: [IndexComponent, ManageAssignmentsComponent, ManageAssignmentSolutionComponent],
  imports: [CommonModule, InstructorRoutingModule, SharedModule],
})
export class InstructorModule {}
