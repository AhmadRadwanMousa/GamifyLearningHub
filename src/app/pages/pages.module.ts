import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesDetailsPageComponent } from './courses-details-page/courses-details-page.component';
import { ProgramDetailsPageComponent } from './program-details-page/program-details-page.component';
import { ProgramsComponent } from './programs/programs.component';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { HomePageComponent } from './home-page/home-page.component';
import { HomePageMainBannerComponent } from './home-page/home-page-main-banner/home-page-main-banner.component';
import { HomePagePrograms } from './home-page/home-page-programs/home-page-programs.component';
import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProgramsPlanComponent } from './programs-plan/programs-plan.component';
import { InstructorPajeComponent } from './instructor-page/instructor-paje.component';
import { InstructorDetailsPageComponent } from './instructor-details-page/instructor-details-page.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    RegisterPageComponent,
    LoginPageComponent,
    ContactUsComponent,
    HomePageComponent,
    HomePageMainBannerComponent,
    HomePagePrograms,
    ProgramsComponent,
    CoursesDetailsPageComponent,
    ProgramDetailsPageComponent,
    NotFoundComponent,
    ProgramsPlanComponent,
    InstructorPajeComponent,
    InstructorDetailsPageComponent,
    AboutUsComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, SharedModule],
  exports: [HomePageComponent],
})
export class PagesModule {}
