import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.scss']
})
export class StudentReportComponent {
  displayedColumns: string[] = ['courseName', 'numberOfAbsence', 'pointsEarned', 'totalMark'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

/* Sample of Data */
export interface PeriodicElement {
  courseName: string;
  numberOfAbsence: number;
  pointsEarned: number;
  totalMark: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {courseName: 'C# Basics', numberOfAbsence: 0, pointsEarned: 240, totalMark: 96},
  {courseName: 'C# OOP', numberOfAbsence: 1, pointsEarned: 250, totalMark: 93},
  {courseName: 'Web Design', numberOfAbsence: 0, pointsEarned: 600, totalMark: 98},
  {courseName: 'Oracle Database', numberOfAbsence: 2, pointsEarned: 780, totalMark: 94},
  {courseName: '.NET MVC', numberOfAbsence: 0, pointsEarned: 780, totalMark: 95},
  {courseName: '.NET Web API', numberOfAbsence: 1, pointsEarned: 980, totalMark: 99},
  {courseName: 'Angular', numberOfAbsence: 0, pointsEarned: 740, totalMark: 99},
  {courseName: 'C# Basics', numberOfAbsence: 0, pointsEarned: 240, totalMark: 96},
  {courseName: 'C# OOP', numberOfAbsence: 1, pointsEarned: 250, totalMark: 93},
  {courseName: 'Web Design', numberOfAbsence: 0, pointsEarned: 600, totalMark: 98},
  {courseName: 'Oracle Database', numberOfAbsence: 2, pointsEarned: 780, totalMark: 94},
  {courseName: '.NET MVC', numberOfAbsence: 0, pointsEarned: 780, totalMark: 95},
  {courseName: '.NET Web API', numberOfAbsence: 1, pointsEarned: 980, totalMark: 99},
  {courseName: 'Angular', numberOfAbsence: 0, pointsEarned: 740, totalMark: 99},
  {courseName: 'C# Basics', numberOfAbsence: 0, pointsEarned: 240, totalMark: 96},
  {courseName: 'C# OOP', numberOfAbsence: 1, pointsEarned: 250, totalMark: 93},
  {courseName: 'Web Design', numberOfAbsence: 0, pointsEarned: 600, totalMark: 98},
  {courseName: 'Oracle Database', numberOfAbsence: 2, pointsEarned: 780, totalMark: 94},
  {courseName: '.NET MVC', numberOfAbsence: 0, pointsEarned: 780, totalMark: 95},
  {courseName: '.NET Web API', numberOfAbsence: 1, pointsEarned: 980, totalMark: 99},
  {courseName: 'Angular', numberOfAbsence: 0, pointsEarned: 740, totalMark: 99},
];
