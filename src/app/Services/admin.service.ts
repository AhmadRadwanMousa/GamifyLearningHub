import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService,private toastr: ToastrService ) { }
  courses:any = []
  getAllCourses(){
    this.spinner.show();
    this.http.get('https://localhost:7036/api/Course').subscribe(
      {
        next:  (result) => {  this.courses = result; this.spinner.hide(); },
        error: (err)    => { this.toastr.error(err.message); }
      }
    );
  }

  postCourse(data: any){
    
    this.http.post('https://localhost:7036/api/Course/', data).subscribe(
      {
        next:  ()=> { console.log('Created'); this.toastr.success('Course Created'); this.getAllCourses()},
        error: (err)=> { console.log(err); this.toastr.error('Course Create Faild'); }
      }
    )
  }

  deleteCourse(id: number): any{
    this.http.delete('https://localhost:7036/api/Course/' + id).subscribe(
      {
        next: (res)=> {this.getAllCourses(); this.toastr.success('Course Deleted'); return res},
        error:(err)=> {console.log(err); this.toastr.error('Course Delete Faild');}
      }
    );
  }

  updateCourse(data: any){
    //debugger
    this.http.put('https://localhost:7036/api/Course/' , data).subscribe(
      {
      next:(res)=>{this.getAllCourses(); this.toastr.success('Course Updated'); return res},
      error:(err)=>{console.log(err); this.toastr.error('Course Update Faild');}
    }
    );
  }
}