import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent {
  @ViewChild('UpdateDialog') UpdateDialog: any;
  constructor(public admin: AdminService, public dialog: MatDialog) {}
  previous_data: any;

  ngOnInit() {
    this.admin.getAllPoints();
  }

  UpdatePointsForm: FormGroup = new FormGroup({
    pointsactivityid: new FormControl(),
    pointsactivityname: new FormControl(),
    points: new FormControl()
  });

  openUpdateDialog(_points: any) {
    this.previous_data = {
      pointsactivityid: _points.pointsactivityid,
      pointsactivityname: _points.pointsactivityname,
      points: _points.points
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
