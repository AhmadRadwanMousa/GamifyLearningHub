import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstructorService } from 'src/app/Services/instructor.service';

@Component({
  selector: 'app-manage-attendence',
  templateUrl: './manage-attendence.component.html',
  styleUrls: ['./manage-attendence.component.scss']
})
export class ManageAttendenceComponent {
  @ViewChild('DetailsDialog') DetailsDialog: any;
  constructor(public instructorService: InstructorService,public dialog: MatDialog) { }
  selectedSection: any;
  UsersInSection: any = [];
  attendencedetail: {
    userid: number;
    isattended: boolean
  }[] = [];
  attendence: {
    sectionid: number;
    attenddate: Date;
    attendencedetail: { userid: number; isattended: boolean }[];
  } = {
      sectionid: 0,
      attenddate: new Date(),
      attendencedetail: [],
    };

  ngOnInit() {
    this.instructorService.GetSectionsByUserId();
  }

  loadStudents(id: number) {
    this.instructorService.getUsersBySectionId(id).subscribe({
      next: (res) => { this.UsersInSection = res; this.attendencedetail = res.map((s: any) => ({ userid: s.userid, isattended: false })); }
    });

  }
  changeStatus(id: number) {
    return this.attendencedetail.map((s) => {
      if (s.userid == id) {
        s.isattended = !s.isattended;
      }
    })
  }
  saveAttendence() {
    this.attendence.sectionid = this.selectedSection;
    this.attendence.attendencedetail = this.attendencedetail;
    const formattedData = {
      attendence: {
        sectionid: this.attendence.sectionid,
        attenddate: this.attendence.attenddate.toISOString(),
      },
      attendencedetail: this.attendence.attendencedetail
    };
    this.instructorService.careteAttendence(formattedData);
    this.ngOnInit();
  }

  OpenDetails(){
    this.instructorService.GetAttendencDetails(this.selectedSection);
    this.dialog.open(this.DetailsDialog, {
      width: '800px',
      height: '500px',
    });
  }
}
