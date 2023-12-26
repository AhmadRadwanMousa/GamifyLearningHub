import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { ManageExamsComponent } from './manage-exams/manage-exams.component';
import { QuestionFormComponent } from './question-form/question-form.component';

@NgModule({
  declarations: [IndexComponent, ManageExamsComponent, QuestionFormComponent],
  imports: [CommonModule, InstructorRoutingModule, SharedModule],
})
export class InstructorModule {}
