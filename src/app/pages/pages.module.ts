import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

import { CoursesDetailsPageComponent } from './courses-details-page/courses-details-page.component';
import { ProgramDetailsPageComponent } from './program-details-page/program-details-page.component';
import { ProgramsComponent } from './programs/programs.component';
import { SharedModule } from '../shared/shared.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterPageComponent,
    LoginPageComponent,
    HomePageComponent,
    CoursesDetailsPageComponent,
    ProgramDetailsPageComponent,
    ProgramsComponent,
    ContactUsComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, SharedModule, FormsModule],
  exports: [HomePageComponent],
})
export class PagesModule {}
