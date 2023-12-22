import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule,
} from 'ngx-toastr';
import { AdminService } from './Services/admin.service';
import { LearnerService } from './Services/learner.service';
import { InstructorService } from './Services/instructor.service';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedService } from './Services/shared.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
  ],
  providers: [AdminService, LearnerService, InstructorService ,SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
