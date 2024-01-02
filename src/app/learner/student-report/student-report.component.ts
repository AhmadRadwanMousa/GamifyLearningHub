import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LearnerService } from 'src/app/Services/learner.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import { Renderer2 } from '@angular/core';

declare let jsPDF: any; // Declare jsPDF to avoid TypeScript errors

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.scss']
})
export class StudentReportComponent {

  constructor(private renderer: Renderer2, private el: ElementRef, public _learnerService: LearnerService) {}
  
  print = () => {
    const pdfTable = this.el.nativeElement.querySelector('.student-report-table');
  
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
  


  displayedColumns: string[] = ['courseName', 'numberOfAbsence', 'pointsEarned', 'totalMark'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit() {
    this._learnerService.GetProgramsByUserId();
}
selectedProgram: any ;
searchText : string = '';
loadData(programId : number){
  this._learnerService.GetCoursesByProgramId(programId);
}

Search(){

  if (this.searchText == ''){
    this._learnerService.reportUserFilter = this._learnerService.reportUser;
  }
  else {
    this._learnerService.reportUserFilter = this._learnerService.reportUser.filter((x:any)=> x.coursename.toUpperCase().includes(this.searchText.toUpperCase()));

  }
}


}




