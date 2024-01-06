import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { jwtDecode } from 'jwt-decode';
import { InstructorService } from 'src/app/Services/instructor.service';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import { DOCUMENT } from '@angular/common';



class QuestionOptions{
  
}

@Component({
  selector: 'app-manage-exams',
  templateUrl: './manage-exams.component.html',
  styleUrls: ['./manage-exams.component.scss']
})
export class ManageExamsComponent {
  @ViewChild('CreateExamDialog') CreateExamDialog: any;
  @ViewChild('CreateQuestionDialog') CreateQuestionDialog: any;
  @ViewChild('DeleteConfirmDialog') DeleteConfirmDialog: any;
  @ViewChild('DetailsDialog') DetailsDialog: any;
  //new
  @ViewChild('StudentsMarksDialog') StudentsMarksDialog : any;

  constructor(public instructorService: InstructorService, public dialog: MatDialog) {}
  selectedSection : any;
  token: string | null = localStorage.getItem('token');

  getUserIdFromToken(): number{
    if(this.token != null){
      let decodedToken: any = jwtDecode(this.token);
      return decodedToken.userId;
    }
    else{
      return 0;
    }
  }
  
  ngOnInit(){
    //console.log(this.getUserIdFromToken());
    this.instructorService.GetSectionsByInstructorId(this.getUserIdFromToken());
  }

  loadExams(id: number){
    this.instructorService.getAllExamsBySectionId(id);
  }
  CreateFormGroup: FormGroup = new FormGroup({
    sectionid: new FormControl(),
    examtype: new FormControl(),
    examdate: new FormControl(),
    exammark: new FormControl(),
    examstatus: new FormControl(),
    openat: new FormControl(),
    closeat: new FormControl(),
  });
  OpenCreateDialog(){
    this.dialog.open(this.CreateExamDialog, {
      width: '800px',
      height: '500px',
    });
  }
  
  createExam(sectionId: number){
    this.CreateFormGroup.controls['sectionid'].setValue(sectionId);
    this.CreateFormGroup.controls['examtype'].setValue(this.selectedType);
    this.CreateFormGroup.controls['examstatus'].setValue(this.selectedStatus);
    this.CreateFormGroup.controls['openat'].setValue(this.mergeDateTime(this.CreateFormGroup.get('openat')?.value));
    this.CreateFormGroup.controls['closeat'].setValue(this.mergeDateTime(this.CreateFormGroup.get('closeat')?.value));

    const nextDay = new Date( this.CreateFormGroup.controls['examdate'].value);
    nextDay.setDate(nextDay.getDate() + 1);
    this.CreateFormGroup.controls['examdate'].setValue(nextDay);

    this.instructorService.CreateExam(this.CreateFormGroup.value);
    
  }
  selectedType: any;
  selectedStatus: any;
  
  mergeDateTime(time: any) {
    let selectedDate: any = this.CreateFormGroup.get('examdate')?.value;
    let selectedTime = time;
    if (selectedTime && selectedDate) {
      const date = new Date(
        selectedDate.toLocaleString('en-US', { timeZone: 'Asia/Amman' })
      );
      const time = selectedTime.split(':');
      date.setHours(parseInt(time[0]) + 3);
      date.setMinutes(parseInt(time[1]));
      return date.toISOString();
    }
    return Date.now();
  }
  examId: any;
  OpenCreateQuestionDialog(id: number){
    this.examId = id;
    this.dialog.open(this.CreateQuestionDialog, {
      width: '1020px',
      height: '710px',
    });
  }
  
  //new
  OpenStudentsMarksDialog(examId : number){
    this.instructorService.GetAllStudentsMarkByExamSectionId(examId , this.selectedSection);
    this.dialog.open(this.StudentsMarksDialog, {
      width: '1020px',
      height: '710px',
    });
  }
  
  questions: QuestionOptions[] = [];
  AddQuestion(){
    this.questions.push(new QuestionOptions());
  }
  RemoveQuestion(){
    this.questions.pop();
  }
  
  OpenDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.DeleteConfirmDialog, {
      panelClass: 'mat-btn',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res != undefined) {
        if (res === 'yes') {
          this.instructorService.DeleteExam(id);
          
        }
      }
    });
  }
  
  OpenDetailsDialog(id: number){
    this.examId = id;
    this.instructorService.GetQuestionAndOptionsByExamId(id);
    this.dialog.open(this.DetailsDialog, {
      width: '1020px',
      height: '710px',
    });
  }
  DeleteQuestion(id: number){
    this.instructorService.DeleteQuestion(id);
    this.instructorService.GetQuestionAndOptionsByExamId(this.examId);
  }
  
}

