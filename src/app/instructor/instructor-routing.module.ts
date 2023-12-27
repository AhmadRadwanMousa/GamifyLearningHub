import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ManageAssignmentsComponent } from './manage-assignments/manage-assignments.component';
import { ManageAssignmentSolutionComponent } from './manage-assignment-solution/manage-assignment-solution.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
  },
  {
    path: 'assignments',
    component: ManageAssignmentsComponent,
  },
  {
    path: 'assignments/:assignmentid',
    component: ManageAssignmentSolutionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorRoutingModule {}
