import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramsComponent } from './programs/programs.component';
import { CoursesDetailsPageComponent } from './courses-details-page/courses-details-page.component';

const routes: Routes = [
  { path: 'courseDetails', component: CoursesDetailsPageComponent },
  {
    path: 'programs',
    component: ProgramsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
