import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LearnerService {
  userId: any = 0;
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,

    private toastr: ToastrService
  ) {
    let token: any = localStorage.getItem('token');
    const tokenPayload: any = jwtDecode(token);
    this.userId = Number(tokenPayload.userId);
   }
   AlertShow: boolean = false;

   CreateTestimonial(data: any) {
    data.userid = this.userId;
    console.log(data)

    this.spinner.show();
    this.http.post('https://localhost:7036/api/Testimonial', data).subscribe({
      next: () => {
        this.spinner.hide();
        this.AlertShow = true;
      },
      error: (err) => {
        this.spinner.hide();
      },
    });
  }

}
