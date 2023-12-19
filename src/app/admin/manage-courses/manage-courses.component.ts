import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.scss']
})


export class ManageCoursesComponent {

  @ViewChild('CreateCourseDialog') CreateCourseDialog : any
  @ViewChild('DeleteConfirmDialog') DeleteConfirmDialog : any
  @ViewChild('UpdateDialog') UpdateDialog : any
  constructor(public admin: AdminService ,public dialog: MatDialog){}
  previus_data: any;
  
  ngOnInit(){
    this.admin.getAllCourses();
  }

  CreateCourseForm: FormGroup = new FormGroup({
    coursename: new FormControl(),
    courselevel: new FormControl(),
    courseimage: new FormControl(),
    examweight: new FormControl(),
    assignmentweight: new FormControl(),
    quizzezweight: new FormControl(),

  });

  UpdateCourseForm: FormGroup = new FormGroup({
    courseid: new FormControl(),
    coursename: new FormControl(),
    courselevel: new FormControl(),
    courseimage: new FormControl(),
    examweight: new FormControl(),
    assignmentweight: new FormControl(),
    quizzezweight: new FormControl(),

  });

CreateCourse()
{
  //console.log(this.CreateCourseForm.value);
  this.admin.postCourse(this.CreateCourseForm.value)

}
OpenCreateDialog(){
  this.dialog.open(this.CreateCourseDialog , {
    width: '600px',
    height: '350px',
  })
}
openUpdateDialog(_course: any)
{
  this.previus_data = {
    courseid:_course.courseid,
    coursename:_course.coursename,
    courselevel:_course.courselevel,
    courseimage:_course.courseimage,
    examweight:_course.examweight,
    assignmentweight:_course.assignmentweight,
    quizzezweight:_course.quizzezweight
  }
  console.log(this.previus_data);
  this.UpdateCourseForm.controls['courseid'].setValue(this.previus_data.courseid);
  
  this.dialog.open(this.UpdateDialog, {
    width: '600px',
    height: '350px',
  })
}
 

UpdateCourse(){
  console.log(this.UpdateCourseForm.value);
  
  this.admin.updateCourse(this.UpdateCourseForm.value);
}


OpenDeleteDialog(id: number){
  
  const dialogRef = this.dialog.open(this.DeleteConfirmDialog, {
    panelClass:'mat-btn'
  });
  dialogRef.afterClosed().subscribe(
   (res)=> {
    if(res != undefined){
      if(res === 'yes'){
        this.admin.deleteCourse(id);
      }
      
    }
   }
  );
}

}
