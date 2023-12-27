import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ManageAttendenceSectionsComponent } from './manage-attendence-sections/manage-attendence-sections.component';
import { ManageAttendenceUsersComponent } from './manage-attendence-users/manage-attendence-users.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
  },
  {
    path: 'my-sections',
    component: ManageAttendenceSectionsComponent,
  },
  {
    path: 'my-sectionsDetails/:id',
    component: ManageAttendenceUsersComponent,
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorRoutingModule {}
