import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { URL } from '../constants/url';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  constructor(
    private http: HttpClient,
    public route: Router,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService
  ) { }


  //Attendence
  //get Sections by instructor id

  SectionsByInstructorId:any=[];

  getAllInstructorSections(id:number =109 ){
    this.http.get(`${URL}/TakeAttendenceBySection/GetSectionsByInstructor/${id}`).subscribe({
      next:(res)=> {
        this.SectionsByInstructorId =res;
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    })
  }


  //Get All Users In Single Section 
  //Get Users By Section ID
  UsersInSection:any;

  getUsersBySectionId(id: number) {
    this.spinner.show();
  
    this.http.get('https://localhost:7036/api/UserSection/GetUsersBySectionId/' + id).subscribe({
      next: (res) => {
        console.log(res); 
        this.UsersInSection = res;
        this.spinner.hide();
      },
      error: (err) => {
        this.toastr.error(err.message);
        this.spinner.hide();
      },
    });
  }



  



  //End Attendence functions
}
