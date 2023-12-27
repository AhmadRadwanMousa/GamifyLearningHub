import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ManageMaterialComponent } from './manage-material/manage-material.component';
import { ManageAssignmentsComponent } from './manage-assignments/manage-assignments.component';
import { ManageAssignmentSolutionComponent } from './manage-assignment-solution/manage-assignment-solution.component';
import { ManageExamsComponent } from './manage-exams/manage-exams.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
  },

  {
    path: 'material',
    component: ManageMaterialComponent,
  },
  {
    path: 'assignments',
    component: ManageAssignmentsComponent,
  },
  {
    path: 'assignments/:assignmentid',
    component: ManageAssignmentSolutionComponent,
  },
  {
    path: 'manageExams',
    component: ManageExamsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorRoutingModule {}
