import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.scss'],
})
export class ManageCoursesComponent {
  @ViewChild('CreateCourseDialog') CreateCourseDialog: any;
  @ViewChild('DeleteConfirmDialog') DeleteConfirmDialog: any;
  @ViewChild('UpdateDialog') UpdateDialog: any;
  constructor(public admin: AdminService, public dialog: MatDialog) {}
  previus_data: any;
  fileName: any;
  filePath: any;
  ngOnInit() {
    this.admin.getAllCourses();
  }

  CreateCourseForm: FormGroup = new FormGroup({
    coursename: new FormControl('', [Validators.minLength(2)]),
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

  CreateCourse() {
    console.log(this.CreateCourseForm.value);
    this.CreateCourseForm.controls['courseimage'].setValue(
      this.filePath
    );
    this.admin.postCourse(this.CreateCourseForm.value);
  }
  OpenCreateDialog() {
    this.dialog.open(this.CreateCourseDialog, {
      width: '600px',
      height: '350px',
    });
  }
  openUpdateDialog(_course: any) {
    this.previus_data = {
      courseid: _course.courseid,
      coursename: _course.coursename,
      courselevel: _course.courselevel,
      courseimage: _course.courseimage,
      examweight: _course.examweight,
      assignmentweight: _course.assignmentweight,
      quizzezweight: _course.quizzezweight,
    };
    console.log(this.previus_data);
    this.UpdateCourseForm.controls['courseid'].setValue(
      this.previus_data.courseid
    );

    this.dialog.open(this.UpdateDialog, {
      width: '600px',
      height: '350px',
    });
  }

  UpdateCourse() {
    this.UpdateCourseForm.controls['courseimage'].setValue(
      this.filePath
    );
    this.admin.updateCourse(this.UpdateCourseForm.value);
  }

  OpenDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.DeleteConfirmDialog, {
      panelClass: 'mat-btn',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res != undefined) {
        if (res === 'yes') {
          this.admin.deleteCourse(id);
        }
      }
    });
  }

  UploadFile(event: any) {
    let fileToUpload = event.target.files[0] as File;
    if (!fileToUpload) {
      return;
    }
    this.fileName = fileToUpload.name;
    const formData = new FormData();
    formData.append('file', fileToUpload);
    this.admin.UploadFile(formData).subscribe((path: string) => {
      this.filePath = path;
    });
    
  }
}
