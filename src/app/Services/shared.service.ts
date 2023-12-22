import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  planswithprograms: any = [];
  GetAllPlansWithPrograms() {
    this.spinner.show();
    this.http
      .get('https://localhost:7036/api/plan/GetAllPlansWithPrograms')
      .subscribe({
        next: (plan) => {
          this.planswithprograms =plan;
          this.spinner.hide();
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
        },
      });
  }


  programswithplanId: any = [];
  searchprograms: any = [];
  GetAllProgramsWithPlanId(id : number) {
    this.spinner.show();
    this.http
      .get('https://localhost:7036/api/Program/GetAllProgramsWithPlanId/' + id)
      .subscribe({
        next: (programs) => {
          this.programswithplanId =programs;
          this.searchprograms = programs;
          this.spinner.hide();
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
        },
      });
  }





}
