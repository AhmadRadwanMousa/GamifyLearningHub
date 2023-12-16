import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsComponent } from './programs/programs.component';

import { PagesRoutingModule } from './pages-routing.module';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

import { HomePageComponent } from './home-page/home-page.component';
import { HomePageMainBannerComponent } from './home-page/home-page-main-banner/home-page-main-banner.component';
import { HomeCoursesComponent } from './home-page/home-page-courses/home-page-courses.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RegisterPageComponent,
    LoginPageComponent
  
    HomePageComponent,
    HomePageMainBannerComponent,
    HomeCoursesComponent,
    ProgramsComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, SharedModule],
  exports: [HomePageComponent],
})
export class PagesModule {}
