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
            this.toastr.success(
              'Your account has been created successfully',
              'Success '
            );
            this.spinner.hide();
            this.route.navigate(['/Login']);
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
  planswithprograms: any = [];
  GetAllPlansWithPrograms() {
    this.spinner.show();
    this.http
      .get('https://localhost:7036/api/plan/GetAllPlansWithPrograms')
      .subscribe({
        next: (plan) => {
          this.planswithprograms = plan;
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
  GetAllProgramsWithPlanId(id: number) {
    this.spinner.show();
    this.http
      .get('https://localhost:7036/api/Program/GetAllProgramsWithPlanId/' + id)
      .subscribe({
        next: (programs) => {
          this.programswithplanId = programs;
          this.searchprograms = programs;
          this.spinner.hide();
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
        },
      });
  }
  Courses: any = [];
  Programs: any = [];

  getAllCourses() {
    this.http.get(`${URL}/Course`).subscribe({
      next: (res) => {
        this.Courses = res;
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }

  getAllPrograms() {
    this.http.get(`${URL}/Program/GetAllPrograms`).subscribe({
      next: (res) => {
        this.Programs = res;
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }

  
 

  program: any;
  getProgramById(id: number) {
    //debugger
    this.http.get(`${URL}/Program/GetProgramById/${id}`).subscribe({
      next: (res) => {
        this.spinner.show();
        this.program = res;
        this.spinner.hide();
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }

  



  course: any;
  getCourseById(id: number) {
    //debugger
    this.http.get(`${URL}/Course/GetById/${id}`).subscribe({
      next: (res) => {
        this.spinner.show();
        this.course = res;
        this.spinner.hide();
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }

  numberOfStudentsInProgram: any;
  getAllStudentsInProgram(id: number) {
    this.http.get(`${URL}/Program/NumOfStudentsInProgram/${id}`).subscribe({
      next: (res) => {
        this.numberOfStudentsInProgram = res;
      },
    });
  }
  CoursesInProgram: any = [];
  getAllCoursesInProgram(id: number) {
    this.http.get(`${URL}/CourseSequence/GetByProgramId/${id}`).subscribe({
      next: (res) => {
        this.CoursesInProgram = res;
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }

  //Instructor Pages

   //Show Instructors page
  //Get All Instructors
  Instructors: any =[];
  getAllInstrutors(){
    this.http.get(`${URL}/Section/GetAllUsersWithRoleId2`).subscribe({
      next:(res)=> {
        this.Instructors=res;
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    })
  }

 
  //Get InstrutorDetails
  InstructorDetails:any;

  getInstructorDetails(id: number) {
    this.spinner.show();
  
    this.http.get('https://localhost:7036/api/user/' + id).subscribe({
      next: (res) => {
        console.log(res); 
        this.InstructorDetails = res;
        this.spinner.hide();
      },
      error: (err) => {
        this.toastr.error(err.message);
        this.spinner.hide();
      },
    });
  }

  //Get  SectionsDetails For Instructor Page

  SectionDetails: any =[];
  getAllSectionDetails(id:number){
    this.http.get(`${URL}/TakeAttendenceBySection/GetSectionsByInstructor/${id}`).subscribe({
      next:(res)=> {
        this.SectionDetails =res;
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    })
  }


 
}
