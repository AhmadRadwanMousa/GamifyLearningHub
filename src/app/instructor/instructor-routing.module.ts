import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ManageExamsComponent } from './manage-exams/manage-exams.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
  },
  {
    path:'manageExams',
    component: ManageExamsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorRoutingModule {}
