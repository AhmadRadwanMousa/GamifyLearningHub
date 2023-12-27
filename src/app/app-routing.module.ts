import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CoursesDetailsPageComponent } from './pages/courses-details-page/courses-details-page.component';
import { ProgramDetailsPageComponent } from './pages/program-details-page/program-details-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BadgeComponent } from './admin/badge/badge.component';
import { AuthGuard } from './RouteGuard/auth-guard.guard';
import { RoleGuard } from './RouteGuard/role.guard';
const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((x) => x.PagesModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((x) => x.AdminModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRoleId: 1,
    },
  },
  {
    path: 'instructor',
    loadChildren: () =>
      import('./instructor/instructor.module').then((x) => x.InstructorModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRoleId: 2,
    },
  },
  {
    path: 'learner',
    loadChildren: () =>
      import('./learner/learner.module').then((x) => x.LearnerModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRoleId: 3,
    },
  },
  {
    path: 'Login',
    component: LoginPageComponent,
  },
  { path: 'Register', component: RegisterPageComponent },
  {
    path: 'contact-page',
    component: ContactUsComponent,
  },

  {
    path: '',
    component: HomePageComponent,
  },
  { path: 'CourseDetails/:id', component: CoursesDetailsPageComponent },
  { path: 'ProgramDetails/:id', component: ProgramDetailsPageComponent },
  { path: 'CourseDetails', component: CoursesDetailsPageComponent },
  { path: 'ProgramDetails/:id', component: ProgramDetailsPageComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
