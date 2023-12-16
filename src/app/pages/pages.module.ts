import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageMainBannerComponent } from './home-page/home-page-main-banner/home-page-main-banner.component';
import { HomeCoursesComponent } from './home-page/home-page-courses/home-page-courses.component';
import { SharedModule } from '../shared/shared.module';
import { CoursesDetailsPageComponent } from './courses-details-page/courses-details-page.component';
import { ProgramDetailsPageComponent } from './program-details-page/program-details-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    CoursesDetailsPageComponent,
    ProgramDetailsPageComponent,
  ],
  imports: [CommonModule, PagesRoutingModule],
  exports: [HomePageComponent],
})
export class PagesModule {}
