import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AdminReportComponent {
  
  constructor(public adminService: AdminService, public dialog:MatDialog){}
  displayedColumnsStudent: string[] = ['firstName', 'lastName','image', 'Points', 'BirthDay', 'Completed Courses','More Deatils'];
  displayedColumnsSection: string[] = ['SectionName','Capacity', 'InstructorName','NumOfStudents', 'NumOfExams', 'NumOfAssignments', 'CourseName'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('DetailsDialog') DetailsDialog: any;
  ngOnInit(){
    this.adminService.GetAllStudentsReports();
    this.adminService.GetAllSectionsReports();
  }
  ngAfterViewInit() {
    this.adminService.StudentsReports.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.adminService.StudentsReports.filter = filterValue.trim().toLowerCase();
}   

applyFilterSections(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.adminService.SectionsReports.filter = filterValue.trim().toLowerCase();
}  
  ShowDetails(id: number){
    this.adminService.GetStudentReportsDetails(id);
    this.dialog.open(this.DetailsDialog, {
      width: '800px',
      height: '500px',
    });
  }
}

