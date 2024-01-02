import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss'],
})
export class UserCoursesComponent implements OnInit {
  constructor(
    public adminService: AdminService,
    private route: ActivatedRoute
  ) {}
  dateNow: Date = new Date();
  ngOnInit(): void {
    this.route.paramMap.subscribe((p) => {
      let programId = p.get('programId');
      this.adminService.GetCoursesSequenceByProgramId(Number(programId));
    });
  }
  isCourseLocked(startDate: string | undefined): boolean {
    if (startDate) {
      const courseStartDate: Date = new Date(startDate);
      return courseStartDate > this.dateNow;
    }
    return false;
  }
}
