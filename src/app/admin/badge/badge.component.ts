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
  fileName: any;
  filePath: any;
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
    this.UpdateBadgesForm.controls['badgeimage'].setValue(
      this.filePath
    );

    this.admin.updateBadge(this.UpdateBadgesForm.value);
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
