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
import { AuthGuard } from './RouteGuard/auth-guard.guard';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './RouteGuard/auth-interceptor';
import { RoleGuard } from './RouteGuard/role.guard';
import { ReportComponent } from './instructor/report/report.component';


@NgModule({
  declarations: [AppComponent, ReportComponent],
  imports: [
    AppRoutingModule,
    SharedModule,
    PagesModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    FormsModule,
   
    ToastNoAnimationModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    FormsModule,
  ],
  providers: [
    AdminService,
    LearnerService,
    InstructorService,
    SharedService,
    AuthGuard,
    RoleGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
