import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
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
