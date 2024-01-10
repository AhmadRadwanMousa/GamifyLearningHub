import { Component, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
})
export class PointsComponent {
  @ViewChild('UpdateDialog') UpdateDialog: any;
  @ViewChild('CreateDialog') CreateCorseCompleteDialog: any;
  @ViewChild('ConfirmationDialog') ConfirmationDeleteDialog: any;

  constructor(public admin: AdminService, public dialog: MatDialog) {}
  previous_data: any;

  ngOnInit() {
    this.admin.getAllPoints();
  }

  UpdatePointsForm: FormGroup = new FormGroup({
    pointsactivityid: new FormControl('', Validators.required),
    pointsactivityname: new FormControl('', Validators.required),
    points: new FormControl('', [
      Validators.required,
      this.pointsGreaterThanZero,
    ]),
  });

  DeletePointsActivity(id: number) {
    this.admin.DeletePointsActivity(id);
  }

  OpenConfirmDialog(id: number) {

    var dialog = this.dialog.open(this.ConfirmationDeleteDialog);
    dialog.afterClosed().subscribe((result) => {
      if (result == 'yes') this.DeletePointsActivity(id);
    });
  }



  pointsGreaterThanZero(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const value = control.value;
    if (value !== null && (isNaN(value) || value <= 0)) {
      return { pointsGreaterThanZero: true };
    }
    return null;
  }

  CreateCourseCompleteForm: FormGroup = new FormGroup({
    numberofcourses: new FormControl('0', Validators.required),
    numberofdays: new FormControl('0', Validators.required),
    points: new FormControl('', Validators.required),
    Pointsactivityname: new FormControl('', Validators.required),
  });

  OpenCreateDialog() {
    this.dialog.open(this.CreateCorseCompleteDialog);
  }

  CreateCourseComplete() {
    this.admin.CreateNewPointsActivity(this.CreateCourseCompleteForm.value);
  }

  openUpdateDialog(_points: any) {
    this.previous_data = {
      pointsactivityid: _points.pointsactivityid,
      pointsactivityname: _points.pointsactivityname,
      points: _points.points,
    };
    console.log(this.previous_data);
    this.UpdatePointsForm.controls['pointsactivityid'].setValue(
      this.previous_data.pointsactivityid
    );

    this.dialog.open(this.UpdateDialog, {
      width: '600px',
      height: '350px',
    });
  }

  UpdatePoints() {
    console.log(this.UpdatePointsForm.value);

    this.admin.updatePoints(this.UpdatePointsForm.value);
  }
}
