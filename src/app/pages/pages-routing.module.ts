import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesDetailsPageComponent } from './courses-details-page/courses-details-page.component';

import { ProgramsComponent } from './programs/programs.component';
import { ProgramsPlanComponent } from './programs-plan/programs-plan.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import {InstructorPajeComponent} from './instructor-page/instructor-paje.component'
import { InstructorDetailsPageComponent } from './instructor-details-page/instructor-details-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
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
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'instructor',
    component: InstructorPajeComponent,
  },
  {
    path: 'instructorDetails/:id',
    component: InstructorDetailsPageComponent,
  },
  {
    path: 'about',
    component: AboutUsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
