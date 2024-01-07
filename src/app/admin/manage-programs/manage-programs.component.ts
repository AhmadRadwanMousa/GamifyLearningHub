import { AdminService } from 'src/app/Services/admin.service';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-programs',
  templateUrl: './manage-programs.component.html',
  styleUrls: ['./manage-programs.component.scss'],
})
export class ManageProgramsComponent {
  constructor(public _adminService: AdminService, public dialog: MatDialog,private router: Router) {}

  
  OpenCourseSequence(id: number) {
    this.router.navigate(['/admin/course-sequence', id]);
}

  ngOnInit() {
    this._adminService.GetAllPrograms();
    this._adminService.GetAllPlans_duplicate();
    this._adminService.GetAllEducationalPeriods();
  }
  @ViewChild('CreateDialog') CreateProgramDialog: any;
  @ViewChild('ConfirmationDialog') ConfirmationDeleteDialog: any;
  @ViewChild('UpdateDialog') UpdateProgramDialog: any;
  @ViewChild('DeatailsDialog') DetailsDialog: any;


  fileName: any;
  filePath: any;

  filesName: any;
  filesPath: any;

  CreateProgramForm: FormGroup = new FormGroup({
    programname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    programdescription: new FormControl('', Validators.required),
    planid: new FormControl('', [Validators.required]),
    programsyllabus: new FormControl(),
    educationalperiodid: new FormControl('', [Validators.required]),
    programimage: new FormControl(),
    programprice: new FormControl('', [Validators.required, this.priceGreaterThanZeroValidator]),
    programsale: new FormControl('0', [Validators.required,this.priceGreaterThanZeroValidator]),
  });
  
  UpdateprogramForm: FormGroup = new FormGroup({
    programid: new FormControl(),
    programname: new FormControl('', [Validators.required]),
    programdescription: new FormControl('', [Validators.required]),
    planid: new FormControl('', [Validators.required]),
    programimage: new FormControl(),
    programsyllabus: new FormControl(),
    educationalperiodid: new FormControl('', [Validators.required]),
    programprice: new FormControl('', [Validators.required, this.priceGreaterThanZeroValidator]),
    programsale: new FormControl('0', [Validators.required, this.priceGreaterThanZeroValidator]),
  });
  
  priceGreaterThanZeroValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value !== null && (isNaN(value) || value <= 0)) {
      return { 'PriceGreaterThanZero': true };
    }
    return null;
  }


  CreateProgram() {
    this.CreateProgramForm.controls['programimage'].setValue(this.filePath);
    this.CreateProgramForm.controls['programsyllabus'].setValue(this.filesPath);

    this._adminService.CreateProgram(this.CreateProgramForm.value);
  }

  DeletProgram(id: number) {
    this._adminService.DeleteProgram(id);
  }

  OpenConfirmDialog(id: number) {
    var dialog = this.dialog.open(this.ConfirmationDeleteDialog);
    dialog.afterClosed().subscribe((result) => {
      if (result == 'yes') this.DeletProgram(id);
    });
  }

  OpenCreateDialog() {
    this.dialog.open(this.CreateProgramDialog, {
      enterAnimationDuration: 1000,
      exitAnimationDuration: 1000,
    });
  }

  p_data: any = {};
  OpenUpdateDialog(data: any) {
    this.dialog.open(this.UpdateProgramDialog);
    this.p_data = data;
    this.UpdateprogramForm.controls['programid'].setValue(
      this.p_data.programid
    );
  }

  UpdateProgram() {
    this.UpdateprogramForm.controls['programimage'].setValue(this.filePath);
    this.UpdateprogramForm.controls['programsyllabus'].setValue(this.filesPath);

    this._adminService.UpdateProgram(this.UpdateprogramForm.value);
  }

  UploadFile(event: any) {
    let fileToUpload = event.target.files[0] as File;
    if (!fileToUpload) {
      return;
    }
    this.fileName = fileToUpload.name;
    const formData = new FormData();
    formData.append('file', fileToUpload);
    this._adminService.UploadFile(formData).subscribe((path: string) => {
      this.filePath = path;
    });
  }


  UploadFiles(event: any) {
    let fileToUpload = event.target.files[0] as File;
    if (!fileToUpload) {
      return;
    }
    this.filesName = fileToUpload.name;
    const formData = new FormData();
    formData.append('file', fileToUpload);
    this._adminService.UploadFiles(formData).subscribe((path: string) => {
      this.filesPath = path;
    });
  }


  data : any = {};
  OpenDetailsDialog(data: any) {
    this.data = data;
    console.log( this.data );
    var dialog = this.dialog.open(this.DetailsDialog);
    dialog.afterClosed().subscribe((result) => {
    
    });
  }

}
