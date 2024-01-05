import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { LearnerService } from 'src/app/Services/learner.service';

@Component({
  selector: 'app-user-attendence',
  templateUrl: './user-attendence.component.html',
  styleUrls: ['./user-attendence.component.scss']
})
export class UserAttendenceComponent {
  usersection: {
    sectionid: number;
    userid:number;
  } = {
      sectionid: 0,
      userid: 0
    };

  @ViewChild('DetailsDialog') DetailsDialog: any;
  constructor(public dialog: MatDialog,public learnerService: LearnerService,public adminService: AdminService, public route: ActivatedRoute) {}
  userId: number = 0;
  ngOnInit(){
    this.route.paramMap.subscribe(param => {
      this.userId = Number(param.get('userid'));
    });
    this.adminService.GetStudentReportsDetails(this.userId);
  }
  
  OpenDetailsDialog(userid: number, sectionid: number){
    
  this.learnerService.UserDashboardAttendence(userid, sectionid);
    
  this.dialog.open(this.DetailsDialog, {
    width: '500px',
    height: '250px',
  });
  }
}
