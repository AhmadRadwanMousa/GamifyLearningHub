import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CoursesDetailsPageComponent } from './pages/courses-details-page/courses-details-page.component';
import { ProgramDetailsPageComponent } from './pages/program-details-page/program-details-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
const routes: Routes = [
  {
    path: 'contact-page',
    component: ContactUsComponent,
  },
  { path: 'Register', component: RegisterPageComponent },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((x) => x.PagesModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((x) => x.AdminModule),
  },
  {
    path: 'Login',
    component: LoginPageComponent,
  },
  {
    path: '',
    component: HomePageComponent,
  },
  { path: 'CourseDetails/:id', component: CoursesDetailsPageComponent },
  { path: 'ProgramDetails/:id', component: ProgramDetailsPageComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
