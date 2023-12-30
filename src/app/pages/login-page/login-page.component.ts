import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(public authService: AuthService) {}
  loginDetails = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });
  OnSubmit() {
    if (this.loginDetails.valid) {
      this.authService.Login(this.loginDetails.value);
    }
  }
  get username() {
    return this.loginDetails.get('username');
  }
  get password() {
    return this.loginDetails.get('password');
  }
}
