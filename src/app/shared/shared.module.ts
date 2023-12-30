import { SharedRoutingModule } from './shared-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FunfactsComponent } from './funfacts/funfacts.component';
import { CountUpModule } from 'ngx-countup';
import { CarouselModule } from 'ngx-owl-carousel-o';
// import { HomePagePrograms } from './home-page-categories/home-page-programs.component';
import { PartnerComponent } from './partner/partner.component';
import { BecomeInstructorComponent } from './become-instructor/become-instructor.component';
import { LightboxModule } from 'ngx-lightbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LightgalleryModule } from 'lightgallery/angular';
import { FeedbackComponent } from './feedback/feedback.component';
import { BlogsComponent } from './blogs/blogs.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';

import { AdminContainerComponent } from './admin-container/admin-container.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { HomeCategoriesComponent } from './home-page-categories/home-page-categories.component';
import { HomePagePrograms } from '../pages/home-page/home-page-programs/home-page-programs.component';
import { InsturctorContainerComponent } from './insturctor-container/insturctor-container.component';
import { SidebarInstructorComponent } from './sidebar-instructor/sidebar-instructor.component';
import { HeaderInstructorComponent } from './header-instructor/header-instructor.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { AuthGuard } from '../RouteGuard/auth-guard.guard';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    FunfactsComponent,
    PartnerComponent,
    HomeCategoriesComponent,
    BecomeInstructorComponent,
    FeedbackComponent,
    BlogsComponent,
    HeaderAdminComponent,
    FooterAdminComponent,
    SidebarAdminComponent,
    AdminContainerComponent,
    InsturctorContainerComponent,
    SidebarInstructorComponent,
    HeaderInstructorComponent,
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedRoutingModule,
    CountUpModule,
    CarouselModule,
    NgxScrollTopModule,
    LightboxModule,
    FormsModule,
    LightgalleryModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    MatCheckboxModule,
    NgxMatTimepickerModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    FunfactsComponent,
    PartnerComponent,
    HomeCategoriesComponent,
    BecomeInstructorComponent,
    FeedbackComponent,
    BlogsComponent,
    FormsModule,
    HeaderAdminComponent,
    FooterAdminComponent,
    SidebarAdminComponent,
    AdminContainerComponent,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatOptionModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    InsturctorContainerComponent,
    SidebarInstructorComponent,
    HeaderInstructorComponent,
    NgxMatTimepickerModule,
    MatCardModule,
  ],
})
export class SharedModule {}
