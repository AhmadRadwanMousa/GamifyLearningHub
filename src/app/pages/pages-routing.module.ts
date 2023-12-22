import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesDetailsPageComponent } from './courses-details-page/courses-details-page.component';

import { ProgramsComponent } from './programs/programs.component';


const routes: Routes = [
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
