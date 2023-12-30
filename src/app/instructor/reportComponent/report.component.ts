import { Component, Input, OnChanges, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { jwtDecode } from 'jwt-decode';
import { InstructorService } from 'src/app/Services/instructor.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent   {
  constructor(public instructorService: InstructorService, public dialog: MatDialog) { 
  }
  
  @ViewChild('DetailsDialog') DetailsDialog: any;
  

  // <!-- Tokens --!>
  token: string | null = localStorage.getItem('token');
  getUserIdFromToken(): number{
    if(this.token != null){
      let decodedToken: any = jwtDecode(this.token);
      return decodedToken.userId;
    }
    else{
      return 0;
    }
  }

  // <!-- Moves hidden properties in Details Dialog --!>
  reportInformation: any;
  reportDetails = new FormGroup({
    totalPoints: new FormControl('', Validators.required),
    Enrollmentdate: new FormControl('', Validators.required),
    Studentmark: new FormControl('', Validators.required),
    Attenddate: new FormControl('', Validators.required),
    Isattended: new FormControl('', Validators.required),
    Points: new FormControl('', Validators.required),
    attendence: new FormControl('', Validators.required),
  });

  // <!-- Details Dialog --!>
OpenDetailsDialog(reportDetails: any) {
  this.reportInformation = reportDetails;
  this.dialog.open(this.DetailsDialog, {
    width: '600px',
    height: '550px',
  });
}

// <!-- Call function to retrieve the reports from DB --!>
ngOnInit() {
  this.instructorService.getAllReports();
  
}

searchText: string = '';
Search()
{
  this.instructorService.filterdReport = this.instructorService.reported.filter((x:any)=> x.Firsname.toUpperCase().includes(this.searchText.toUpperCase()))
}



}
