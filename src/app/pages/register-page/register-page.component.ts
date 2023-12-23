import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { AuthService } from 'src/app/Services/auth.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  constructor(
    authService: AuthService,
    private sharedService: SharedService,
    public route: Router
  ) {}

  registerDetails = new FormGroup({
    firsname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    dateofbirth: new FormControl('', [Validators.required]),
    roleid: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{10,}$/),
    ]),
  });
  get username() {
    return this.registerDetails.get('username');
  }
  get password() {
    return this.registerDetails.get('password');
  }

  OnSubmit() {
    if (this.registerDetails.valid) {
      let roleid: any = this.registerDetails.get('roleid')?.value;
      let username: any = this.registerDetails
        .get('username')
        ?.value?.toLowerCase();
      let newUser: any = this.registerDetails.value;
      if (roleid === 2) {
        newUser.isaccepted = false;
      } else {
        newUser.isaccepted = true;
      }
      newUser.lastlogin = new Date();
      newUser.username = username;
      newUser.totalpoints = 0;

      this.sharedService.CreateUser(newUser);
    }
  }
}
