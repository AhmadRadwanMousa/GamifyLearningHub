import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { ManageAttendenceSectionsComponent } from './manage-attendence-sections/manage-attendence-sections.component';
import { ManageAttendenceUsersComponent } from './manage-attendence-users/manage-attendence-users.component';


@NgModule({
  declarations: [IndexComponent, ManageAttendenceSectionsComponent, ManageAttendenceUsersComponent ],
  imports: [CommonModule, InstructorRoutingModule, SharedModule],
})
export class InstructorModule {
  
}
