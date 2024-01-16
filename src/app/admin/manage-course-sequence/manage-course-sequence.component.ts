import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-manage-course-sequence',
  templateUrl: './manage-course-sequence.component.html',
  styleUrls: ['./manage-course-sequence.component.scss']
})
export class ManageCourseSequenceComponent {

  constructor(private route: ActivatedRoute,public _adminService: AdminService, 
    public dialog: MatDialog,private router: Router ,
    ) { }


  
  id : any = 0;
  ngOnInit() {
    this.route.params.subscribe(params => {
         this.id = +params?.['programid'];
        this._adminService.GetCoursesSequenceByProgramId(this.id);
        this._adminService.GetprogromById(this.id);
        
    });

    this._adminService.getAllCourses();
   
  }



   
  @ViewChild('CreateDialog') CreateCorseSequenceDialog: any;
  @ViewChild('ConfirmationDialog') ConfirmationDeleteDialog: any;
  @ViewChild('UpdateDialog') UpdateCorseSequenceDialog: any;
  @ViewChild('ConfirmationCertificationDialog') ConfirmationCertificationDialog: any;


  OpenSections(id: number) {
    this.router.navigate(['/admin/section', id]);
}

  OpenCreateDialog() {
     this.dialog.open(this.CreateCorseSequenceDialog);
  
  }

  startDateValid = false;
  isStartDateValid() : boolean {
    var minStartDate = new Date(this._adminService.progromById.educationalperiod.startdate);
    var minEndDate = new Date(this._adminService.progromById.educationalperiod.enddate);
    const selectedStartDate = this.CreateCourseSequenceForm.controls['startdate'].value;
    const selectedEndDate = this.CreateCourseSequenceForm.controls['enddate'].value;
    this.startDateValid = selectedStartDate >= minStartDate && selectedStartDate <= minEndDate  && selectedStartDate <= selectedEndDate;
    return  this.startDateValid;
  }
  
  endtDateValid = false;
  isEndDateValid() : boolean {
    var minStartDate = new Date(this._adminService.progromById.educationalperiod.startdate);
    var minEndDate = new Date(this._adminService.progromById.educationalperiod.enddate);
    const selectedEndDate = this.CreateCourseSequenceForm.controls['enddate'].value;
    this.endtDateValid = selectedEndDate >= minStartDate && selectedEndDate <= minEndDate ;
    return  this.endtDateValid;
  }
  textErrorStart = "";
  textErrorEnd = "";
   
  showError(){

if (this.startDateValid == false ){
  this.textErrorStart = "Start date cannot be less than the start date educational period or more than end date course sequence"
}
else {
  this.textErrorStart = "";
}
if (this.endtDateValid == false){
  this.textErrorEnd = "End date cannot be more than the end date educational period"
}
else {
  this.textErrorEnd = "";
}

if (this.textErrorStart != ""  || this.textErrorEnd != ""){
  return true;
}
return false;

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
    certificationsNavigation : new FormControl(),
  });


  MyCourse : any = -1;
  Change(){
    console.log(this.CreateCourseSequenceForm.controls['courseid'].value)
      this.MyCourse = this.CreateCourseSequenceForm.controls['courseid'].value;
  
  }

  CreateCourseSequence() {
    console.log(this.CreateCourseSequenceForm.controls['startdate'].value);
    const nextDay = new Date( this.CreateCourseSequenceForm.controls['startdate'].value);
    nextDay.setDate(nextDay.getDate() + 1);
    this.CreateCourseSequenceForm.controls['startdate'].setValue(nextDay);


    const nextDay1 = new Date( this.CreateCourseSequenceForm.controls['enddate'].value);
    nextDay1.setDate(nextDay1.getDate() + 1);
    this.CreateCourseSequenceForm.controls['enddate'].setValue(nextDay1);

    if(this.CreateCourseSequenceForm.controls['perviouscourseid'].value == 0)
    this.CreateCourseSequenceForm.controls['perviouscourseid'].setValue(null);
    this.CreateCourseSequenceForm.controls['programid'].setValue(this.id);
    this._adminService.CreateCoursesSequence(this.CreateCourseSequenceForm.value);

    this.textErrorStart = "";
    this.textErrorEnd = "";
    this.startDateValid = false;
    this.endtDateValid = false;


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


  CertificationCourseSequence(id: number) {
    this._adminService.CreateCertificationCourseSequence(id , this.id);
  }

  OpenConfirmCertificationDialog(id: number) {
    var dialog = this.dialog.open(this.ConfirmationCertificationDialog);
    dialog.afterClosed().subscribe((result) => {
      if (result == 'yes') this.CertificationCourseSequence(id);
    });
  }

  OpenUpdateDialog(data : any){
    this.UpdateCourseSequenceForm.setValue(data);
    this.dialog.open(this.UpdateCorseSequenceDialog);
    }
    
    UpdateCourseSequence(){

      const nextDay = new Date( this.UpdateCourseSequenceForm.controls['startdate'].value);
      nextDay.setDate(nextDay.getDate() + 1);
      this.UpdateCourseSequenceForm.controls['startdate'].setValue(nextDay);
  
  
      const nextDay1 = new Date( this.UpdateCourseSequenceForm.controls['enddate'].value);
      nextDay1.setDate(nextDay1.getDate() + 1);
      this.UpdateCourseSequenceForm.controls['enddate'].setValue(nextDay1);


      if(this.UpdateCourseSequenceForm.controls['perviouscourseid'].value == 0)
      this.UpdateCourseSequenceForm.controls['perviouscourseid'].setValue(null);
      this._adminService.UpdateCourseSequence(this.UpdateCourseSequenceForm.value , this.id);
    }

}