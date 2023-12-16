import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

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
  }
>>>>>>> origin/MohammedWork
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
