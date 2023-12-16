import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [AppComponent,  RegisterPageComponent,
    LoginPageComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, PagesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
