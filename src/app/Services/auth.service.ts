import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../constants/url';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { LearnerService } from './learner.service';
import { InstructorService } from './instructor.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    public tostr: ToastrService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private learnerService: LearnerService,
    private instructorService: InstructorService
  ) {}

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  Login(loginDetails: any) {
    this.spinner.show();
    this.http.post(`${URL}/Authentication`, loginDetails).subscribe(
      (res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          const tokenPayload: any = jwtDecode(res.token);
          let roleId: number = Number(tokenPayload.roleId);
          this.isLoggedInSubject.next(true);
          this.HandleNavigate(roleId);
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        } else {
          setTimeout(() => {
            this.spinner.hide();
            this.tostr.error('Please try again!', 'Wrong login credentials');
          }, 1000);
        }
      },
      (error) => {
        if (error.status === 401) {
          setTimeout(() => {
            this.spinner.hide();
            this.tostr.error('Please try again!', 'Wrong login credentials');
          }, 1000);
        }
      }
    );
  }
  Logout() {
    this.learnerService.CleanLearnerData();
    this.instructorService.CleanInstructorData();
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.route.navigate(['/Login']);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }
  HandleNavigate(roleId: number) {
    if (roleId === 1) {
      this.route.navigate(['/admin/index']);
    } else if (roleId === 2) {
      this.route.navigate(['/instructor/index']);
    } else {
      this.route.navigate(['/']);
    }
  }
}
