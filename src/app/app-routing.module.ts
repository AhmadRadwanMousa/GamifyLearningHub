import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesDetailsPageComponent } from './pages/courses-details-page/courses-details-page.component';
import { ProgramDetailsPageComponent } from './pages/program-details-page/program-details-page.component';

const routes: Routes = [
  {path: 'CourseDetails', component: CoursesDetailsPageComponent},
  {path: 'ProgramDetails', component: ProgramDetailsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
