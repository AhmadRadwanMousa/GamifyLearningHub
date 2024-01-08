import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { jwtDecode } from 'jwt-decode';
import { InstructorService } from 'src/app/Services/instructor.service';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';



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
      height: '340px',
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

    this.instructorService.CreateExam(this.CreateFormGroup.value, this.selectedSection);
    
  }
  selectedType: any;
  selectedStatus: any;
  
  mergeDateTime(time: any) {
    let selectedDate: any = this.CreateFormGroup.get('examdate')?.value;
    let selectedTime = this.convertTo24HourFormat(time); // Convert to 24-hour format first
  
    if (selectedTime && selectedDate) {
      // Parse the date string directly, considering timezone
      const date = new Date(Date.parse(selectedDate));
  
      // Set hours and minutes from 24-hour format
      const timeParts = selectedTime.split(':');
      date.setHours(parseInt(timeParts[0]));
      date.setMinutes(parseInt(timeParts[1]));
  
      // Ensure UTC for consistent time handling
      const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()));
  
      return utcDate.toISOString(); // Return UTC ISO string
    }
  
    return Date.now();
  }
  
  convertTo24HourFormat(time: string): string {
    const [timePart, ampm] = time.split(' ');
    const [hours, minutes] = timePart.split(':');
  
    let formattedHours = parseInt(hours, 10);
  
    if (ampm === 'PM' && formattedHours !== 12) {
      formattedHours += 12; // Add 12 for PM hours (except 12 PM)
    } else if (ampm === 'AM' && formattedHours === 12) {
      formattedHours = 0; // Handle 12 AM as 00:00
    }
  
    return `${formattedHours.toString().padStart(2, '0')}:${minutes}`;
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
          this.instructorService.DeleteExam(id, this.selectedSection);
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

