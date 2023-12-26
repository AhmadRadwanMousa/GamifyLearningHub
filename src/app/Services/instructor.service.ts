import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { URL } from '../constants/url';
import { QuestionWithOptions } from 'src/app/instructor/question-form/question-form.component';
import { catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  MyInstructorSections : any= [];
  GetAllInstructorSectionsById(id: number){
    this.http.get(`${URL}/TakeAttendenceBySection/GetSectionsByInstructor/${id}`).subscribe(
      {
        next:(res)=>{this.MyInstructorSections = res;}
      }
    );
  }

  examsBySection: any = [];
  getAllExamsBySectionId(id: number){
    this.http.get(`${URL}/Exam/GetAllExamsBySectionId/${id}`).subscribe(
      {
        next:(res)=>{this.examsBySection = res},
        error:(err)=>{this.toastr.info('there is no exams in this section')}
      }
    );
  }

  CreateExam(data: any){
    this.http.post(`${URL}/Exam/`, data).subscribe(
      {
        next:()=>{this.toastr.success('Exam created successflly')},
        error:()=>{this.toastr.error('Exam Creat Faild')}
      }
    );
  }
  /*CreateQuestionWithOptions(examId: number, data: any){
    this.http.post(`${URL}/Exam/CreateQuestionWithOptions/${examId}`, data).subscribe(
      {
        next:()=>{this.toastr.success('Question Created')},
        error:(err)=>{this.toastr.error('Create Question Faild'); console.log(err.message);
        }
      }
    );
  }*/
  CreateQuestionWithOptions(examId: number, questionWithOptions: QuestionWithOptions) {
    const url = `${URL}/Exam/CreateQuestionWithOptions/${examId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, questionWithOptions, { headers, responseType: 'text' })
    .pipe(
      catchError((error) => {
        console.error('HTTP Request Error:', error);
        throw error; 
      })
    );
  }

  
}
