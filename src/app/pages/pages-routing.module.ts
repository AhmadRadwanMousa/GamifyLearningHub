import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesDetailsPageComponent } from './courses-details-page/courses-details-page.component';

import { ProgramsComponent } from './programs/programs.component';
import { ProgramsPlanComponent } from './programs-plan/programs-plan.component';

const routes: Routes = [
  {
    path: 'programs',
    component: ProgramsComponent,
  },
  { path: 'courseDetails', component: CoursesDetailsPageComponent },

  {
    path: 'programsplan/:id',
    component: ProgramsPlanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
