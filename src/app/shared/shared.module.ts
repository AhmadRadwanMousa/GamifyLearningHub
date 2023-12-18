import { SharedRoutingModule } from './shared-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FunfactsComponent } from './funfacts/funfacts.component';
import { CountUpModule } from 'ngx-countup';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeCategoriesComponent } from './home-page-categories/home-page-categories.component';
import { PartnerComponent } from './partner/partner.component';
import { BecomeInstructorComponent } from './become-instructor/become-instructor.component';
import { LightboxModule } from 'ngx-lightbox';
import { FormsModule } from '@angular/forms';
import { LightgalleryModule } from 'lightgallery/angular';
import { FeedbackComponent } from './feedback/feedback.component';
import { BlogsComponent } from './blogs/blogs.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    FunfactsComponent,
    HomeCategoriesComponent,
    PartnerComponent,
    BecomeInstructorComponent,
    FeedbackComponent,
    BlogsComponent,
    HeaderAdminComponent,
    FooterAdminComponent,
    SidebarAdminComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedRoutingModule,
    NgxScrollTopModule,
    CountUpModule,
    CarouselModule,
    NgxScrollTopModule,
    LightboxModule,
    FormsModule,
    LightgalleryModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    FunfactsComponent,
    HomeCategoriesComponent,
    PartnerComponent,
    BecomeInstructorComponent,
    FeedbackComponent,
    BlogsComponent,
    FormsModule,
    HeaderAdminComponent,
    FooterAdminComponent,
    SidebarAdminComponent,
  ],
})
export class SharedModule {}
