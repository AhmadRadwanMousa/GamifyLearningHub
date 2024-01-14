import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

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

  visibility: boolean = false;
  usernameToResetPassword: string = '';
  InvalidUserName: boolean = false;

  OTPView: boolean = false;
  generatedOTP: number = 0;
  userOTP: number = 0;

  ResetPasswordView: boolean = false;
  newPassword: any = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]);
  inValidOTP: boolean = false;

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
  OpenForgetPasswordDialog() {
    this.visibility = true;
  }
  CheckUsername() {
    if (this.usernameToResetPassword !== '' && this.usernameToResetPassword) {
      this.authService.spinner.show();
      this.authService.IsUserNameExist(this.usernameToResetPassword).subscribe(
        (res: any) => {
          if (res) {
            if (res !== 0) {
              this.visibility = false;
              this.generatedOTP = res;
              this.OTPView = true;
            } else {
              this.InvalidUserName = true;
            }
            this.authService.spinner.hide();
          }
        },
        (error) => {
          this.authService.spinner.hide();
        }
      );
    } else {
      this.InvalidUserName = true;
    }
  }
  CheckMatchingOTP() {
    if (this.generatedOTP === this.userOTP) {
      this.ResetPasswordView = true;
      this.OTPView = false;
      this.inValidOTP = false;
    } else {
      this.inValidOTP = true;
    }
  }
  UpdateUserPassword() {
    this.authService.ResetPassword(
      this.usernameToResetPassword,
      this.newPassword.value
    );
    this.ResetPasswordView = false;
  }
}
