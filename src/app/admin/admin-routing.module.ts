import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';

const routes: Routes = [
    {
    path : 'index' ,
    component : IndexComponent
    },
    {path : 'manageCourses' ,
    component : ManageCoursesComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
