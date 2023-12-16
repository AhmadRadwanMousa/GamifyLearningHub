import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CoursesDetailsPageComponent } from './pages/courses-details-page/courses-details-page.component';
import { ProgramDetailsPageComponent } from './pages/program-details-page/program-details-page.component';
const routes: Routes = [{
  path: 'contact-page', component: ContactUsComponent
}
  {
<<<<<<< HEAD
    path: 'pages' ,
    loadChildren : ()=> import('./pages/pages.module').then(x=>x.PagesModule)
  },
=======
    {path:"Register",component: RegisterPageComponent
  },
  {
    path:"Login",component: LoginPageComponent
  }, {path: 'CourseDetails', component: CoursesDetailsPageComponent},
  {path: 'ProgramDetails', component: ProgramDetailsPageComponent}
>>>>>>> origin/MohammedWork
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
