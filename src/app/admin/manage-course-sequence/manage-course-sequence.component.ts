import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-manage-course-sequence',
  templateUrl: './manage-course-sequence.component.html',
  styleUrls: ['./manage-course-sequence.component.scss']
})
export class ManageCourseSequenceComponent {

  constructor(private route: ActivatedRoute,public _adminService: AdminService, public dialog: MatDialog) { }
  id : any = 0;
  ngOnInit() {
    this.route.params.subscribe(params => {
         this.id = +params?.['programid'];
        this._adminService.GetCoursesSequenceByProgramId(this.id);
        
    });

    this._adminService.getAllCourses();
   
  }

   
  @ViewChild('CreateDialog') CreateCorseSequenceDialog: any;
  @ViewChild('ConfirmationDialog') ConfirmationDeleteDialog: any;
  @ViewChild('UpdateDialog') UpdateCorseSequenceDialog: any;

  OpenCreateDialog() {
    this.dialog.open(this.CreateCorseSequenceDialog, {
    
    });
  }

  CreateCourseSequenceForm: FormGroup = new FormGroup({
    courseid: new FormControl('', Validators.required),
    programid: new FormControl(this.id, Validators.required),
    perviouscourseid: new FormControl(),
    startdate: new FormControl('', [Validators.required]),
    enddate: new FormControl('', [Validators.required])
  });



  UpdateCourseSequenceForm: FormGroup = new FormGroup({
    coursesequenceid : new FormControl(),
    courseid: new FormControl('', Validators.required),
    programid: new FormControl(this.id, Validators.required),
    perviouscourseid: new FormControl(),
    startdate: new FormControl('', [Validators.required]),
    enddate: new FormControl('', [Validators.required]),
    course : new FormControl(),
    perviouscourse : new FormControl(),
    program : new FormControl(),
    certifications : new FormControl(),
    sections  : new FormControl(),
  });


  MyCourse : any = -1;
  Change(){
    console.log(this.CreateCourseSequenceForm.controls['courseid'].value)
      this.MyCourse = this.CreateCourseSequenceForm.controls['courseid'].value;
  
  }

  CreateCourseSequence() {
    if(this.CreateCourseSequenceForm.controls['perviouscourseid'].value == 0)
    this.CreateCourseSequenceForm.controls['perviouscourseid'].setValue(null);
    this.CreateCourseSequenceForm.controls['programid'].setValue(this.id);
    this._adminService.CreateCoursesSequence(this.CreateCourseSequenceForm.value);
  }

  DeletCourseSequence(id: number) {
    this._adminService.DeleteCoursesSequence(id , this.id);
  }
  OpenConfirmDialog(id: number) {

    var dialog = this.dialog.open(this.ConfirmationDeleteDialog);
    dialog.afterClosed().subscribe((result) => {
      if (result == 'yes') this.DeletCourseSequence(id);
    });
  }


  OpenUpdateDialog(data : any){
    this.UpdateCourseSequenceForm.setValue(data);
    this.dialog.open(this.UpdateCorseSequenceDialog);
    }
    
    UpdateCourseSequence(){
      if(this.UpdateCourseSequenceForm.controls['perviouscourseid'].value == 0)
      this.UpdateCourseSequenceForm.controls['perviouscourseid'].setValue(null);
      this._adminService.UpdateCourseSequence(this.UpdateCourseSequenceForm.value , this.id);
    }

}
