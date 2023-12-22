import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../constants/url';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
    ) { }
    // Course Details & Program Details => 
    Courses: any = []
    Programs: any = []

    getAllCourses(){
      this.http.get(`${URL}/Course`).subscribe({
        next:(res)=>{this.Courses = res},
        error:(err) =>{this.toastr.error(err.message)}
      });
    }

    getAllPrograms(){
      this.http.get(`${URL}/Program/GetAllPrograms`).subscribe(
        {
          next:(res)=> {this.Programs = res},
          error:(err)=>{this.toastr.error(err.message)}
        }
      );
    }
    program: any;
    getProgramById(id: number){
      //debugger
      this.http.get(`${URL}/Program/GetProgramById/${id}`).subscribe({
        next:(res)=> {
          this.spinner.show();
          this.program = res;
          this.spinner.hide();
        },
        error:(err)=> {this.toastr.error(err.message)}
      });
    }
    course: any;
    getCourseById(id: number){
      //debugger
      this.http.get(`${URL}/Course/GetById/${id}`).subscribe({
        next:(res)=> {
          this.spinner.show();
          this.course = res;
          this.spinner.hide();
        },
        error:(err)=> {this.toastr.error(err.message)}
      });
    }

    numberOfStudentsInProgram : any;
    getAllStudentsInProgram(id: number){
      this.http.get(`${URL}/Program/NumOfStudentsInProgram/${id}`).subscribe({
        next:(res)=>{this.numberOfStudentsInProgram = res;}
      });
    }
    CoursesInProgram: any = []; 
    getAllCoursesInProgram(id: number){
      this.http.get(`${URL}/CourseSequence/GetByProgramId/${id}`).subscribe(
        {
          next:(res)=>{this.CoursesInProgram = res},
          error:(err)=>{this.toastr.error(err.message)}
        }
      );
    }
}
