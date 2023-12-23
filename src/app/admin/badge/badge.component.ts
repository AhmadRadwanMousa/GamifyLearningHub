import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';


@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  @ViewChild('UpdateDialog') UpdateDialog: any;
  constructor(public admin: AdminService,public dialog:MatDialog){}

  previous_data: any;
  ngOnInit() {
    this.admin.getAllBadges();
  }

  UpdateBadgesForm: FormGroup = new FormGroup({
    badgeactivityid: new FormControl(),
    badgeimage: new FormControl(),
    badgepoints: new FormControl(),
    badgename: new FormControl()
  });

  openUpdateDialog(_badge: any) {
    this.previous_data = {
      badgeactivityid: _badge.badgeactivityid,
      badgeimage: _badge.badgeimage,
      badgepoints: _badge.badgepoints,
      badgename: _badge.badgename
    };
    console.log(this.previous_data);
    this.UpdateBadgesForm.controls['badgeactivityid'].setValue(
      this.previous_data.badgeactivityid
    );

    this.dialog.open(this.UpdateDialog, {
      width: '600px',
      height: '350px',
    });
  }
  UpdateBadge() {
    console.log(this.UpdateBadgesForm.value);

    this.admin.updateBadge(this.UpdateBadgesForm.value);
  }
}
