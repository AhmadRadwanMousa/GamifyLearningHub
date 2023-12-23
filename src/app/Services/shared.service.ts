import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { URL } from '../constants/url';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    private http: HttpClient,
    public route: Router,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService
  ) {}
  CreateUser(newUser: any) {
    this.spinner.show();
    this.http.post(`${URL}/User`, newUser).subscribe(
      (res: any) => {
        if (!isNaN(res)) {
          setTimeout(() => {
            this.spinner.hide();
            this.route.navigate(['/']);
          }, 1000);
        }
      },
      (e) => {
        setTimeout(() => {
          console.log(e.message);
          this.spinner.hide();
          this.toastr.info(
            'Please enter a valid email',
            'Email is already exist '
          );
        }, 1000);
      }
    );
  }
}
