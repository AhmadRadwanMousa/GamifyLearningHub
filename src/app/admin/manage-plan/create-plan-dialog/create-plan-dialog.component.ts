import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-create-plan-dialog',
  templateUrl: './create-plan-dialog.component.html',
  styleUrls: ['./create-plan-dialog.component.scss'],
})
export class CreatePlanDialogComponent {
  @ViewChild('UpdatePlanDialog') updateDialog: any;
  planDetails: FormGroup;
  fileName: any;
  filePath: any;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreatePlanDialogComponent>,
    private adminService: AdminService
  ) {
    this.planDetails = this.formBuilder.group({
      planname: ['', Validators.required],
    });
  }
  SaveCourse() {
    const newPlan = {
      Planname: this.planDetails.get('planname')?.value,
      Planimage: this.filePath,
    };

    this.adminService.CreatePlan(newPlan).subscribe((res) => {
      console.log(res);
    });
  }
  uploadeFile(event: any) {
    let fileToUpload = event.target.files[0] as File;
    if (!fileToUpload) {
      return;
    }
    this.fileName = fileToUpload.name;
    const formData = new FormData();
    formData.append('file', fileToUpload);
    this.adminService.UploadImage(formData).subscribe((res: any) => {
      this.filePath = res.path;
      console.log(res);
    });
  }
}
