import { AdminService } from 'src/app/Services/admin.service';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-manage-programs',
  templateUrl: './manage-programs.component.html',
  styleUrls: ['./manage-programs.component.scss'],
})
export class ManageProgramsComponent {
  constructor(public _adminService: AdminService, public dialog: MatDialog) {}

  ngOnInit() {
    this._adminService.GetAllPrograms();
    this._adminService.GetAllPlans_duplicate();
    this._adminService.GetAllEducationalPeriods();
  }
  @ViewChild('CreateDialog') CreateProgramDialog: any;
  @ViewChild('ConfirmationDialog') ConfirmationDeleteDialog: any;
  @ViewChild('UpdateDialog') UpdateProgramDialog: any;

  CreateProgramForm: FormGroup = new FormGroup({
    programname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    programdescription: new FormControl('', Validators.required),
    planid: new FormControl('', [Validators.required]),
    programsyllabus: new FormControl('', [Validators.required]),
    educationalperiodid: new FormControl('', [Validators.required]),
    programprice: new FormControl('', [Validators.required]),
    programsale: new FormControl('0', [Validators.required]),
  });

  UpdateprogramForm: FormGroup = new FormGroup({
    programid: new FormControl(),
    programname: new FormControl(),
    programdescription: new FormControl(),
    planid: new FormControl(),
    programsyllabus: new FormControl(),
    educationalperiodid: new FormControl(),
    programprice: new FormControl(),
    programsale: new FormControl(),
  });

  CreateProgram() {
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
      width: '600px',
      height: '500px',
      enterAnimationDuration: 1000,
      exitAnimationDuration: 1000,
    });
  }

  p_data: any = {};
  OpenUpdateDialog(data: any) {
    this.dialog.open(this.UpdateProgramDialog, {
      width: '600px',
      height: '500px',
      enterAnimationDuration: 1000,
      exitAnimationDuration: 1000,
    });
    this.p_data = data;
    this.UpdateprogramForm.controls['programid'].setValue(
      this.p_data.programid
    );
  }

  UpdateProgram() {
    this._adminService.UpdateProgram(this.UpdateprogramForm.value);
  }
}
