import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesDetailsPageComponent } from './courses-details-page/courses-details-page.component';

const routes: Routes = [
  { path: 'courseDetails', component: CoursesDetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
