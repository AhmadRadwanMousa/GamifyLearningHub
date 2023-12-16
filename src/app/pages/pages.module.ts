import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { ProgramsComponent } from './programs/programs.component';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { HomePageComponent } from './home-page/home-page.component';
import { HomePageMainBannerComponent } from './home-page/home-page-main-banner/home-page-main-banner.component';
import { HomeCoursesComponent } from './home-page/home-page-courses/home-page-courses.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RegisterPageComponent,
    LoginPageComponent,
    ContactUsComponent,
    HomePageComponent,
    HomePageMainBannerComponent,
    HomeCoursesComponent,
    ProgramsComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, SharedModule, FormsModule],
  exports: [HomePageComponent],
})
export class PagesModule {}
=======
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PagesModule { }
>>>>>>> origin/Shurman(contact-page)
