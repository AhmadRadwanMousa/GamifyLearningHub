import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChange, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { jwtDecode } from 'jwt-decode';
import { InstructorService } from 'src/app/Services/instructor.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent   {
  constructor(public instructorService: InstructorService, public dialog: MatDialog,private renderer: Renderer2, private el: ElementRef) { 
  }
  print = () => {
    const pdfTable = this.el.nativeElement.querySelector('.my-report');
  
    html2canvas(pdfTable).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
  
      const doc = new jspdf.jsPDF();
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('table.pdf');
    });
  }
  getLiveData() {
    return [['log1', '$100'], ['log2', '$200']];
  }
  @ViewChild('DetailsDialog') DetailsDialog: any;
  displayedColumns: string[] = ['firstName', 'lastName', 'points', 'absences','More Details'];
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.instructorService.reportsBySectionId.filter = filterValue.trim().toLowerCase();
  }
  selectedSection : any;
  // <!-- Tokens --!>
  /*
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
*/
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
    absences: new FormControl('', Validators.required),
  });

  // <!-- Details Dialog --!>
OpenDetailsDialog(reportDetails: any) {
  this.reportInformation = reportDetails;
  this.dialog.open(this.DetailsDialog, {
    width: '600px',
    height: '550px',
  });
}

// <!-- Call function to retrieve the reports by Instructor ID--!>
ngOnInit() {
  this.instructorService.GetSectionsByUserId();
}

loadReports(id: number){
  console.log(id);
  this.instructorService.getAllReportsBySectionId(id);
}






}

