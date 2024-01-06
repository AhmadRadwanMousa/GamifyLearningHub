import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AdminService } from 'src/app/Services/admin.service';
import { LearnerService } from 'src/app/Services/learner.service';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss'],
})
export class UserCoursesComponent implements OnInit {
  constructor(
    public adminService: AdminService,
    public learnerService: LearnerService,
    private route: ActivatedRoute
  ) {}

  dateNow: Date = new Date();
  UserProgressPerCourse: any = [];
  LecturesCountPerCourse: any = [];
  UserProgress: any = [];
  ngOnInit(): void {
    this.route.paramMap.subscribe((p) => {
      let programId = p.get('programId');
      this.adminService.GetCoursesSequenceByProgramId(Number(programId));
      forkJoin([
        this.learnerService.GetUserProgressPerCourse(Number(programId)),
        this.learnerService.GetLecturesPerCourse(Number(programId)),
      ]).subscribe(
        ([userProgress, lectures]) => {
          if (userProgress) {
            this.UserProgressPerCourse = userProgress;
          } else {
            this.UserProgressPerCourse = [];
          }

          if (lectures) {
            this.LecturesCountPerCourse = lectures;
          } else {
            this.LecturesCountPerCourse = [];
          }

          this.GetUserProgressPerCourse();
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
    });
  }
  GetUserProgressPerCourse() {
    const progressPercentage = this.UserProgressPerCourse.map(
      (progress: any) => {
        const { coursesequenceid, userprogresscount } = progress;
        const lecturesData = this.LecturesCountPerCourse.find(
          (data: any) => data.coursesequenceid === coursesequenceid
        );

        if (lecturesData && lecturesData.lecturescount > 0) {
          const lecturesCount = lecturesData.lecturescount;
          const percentage = (userprogresscount / lecturesCount) * 100;
          return { coursesequenceid, progressPercentage: percentage };
        } else {
          return { coursesequenceid, progressPercentage: 0 };
        }
      }
    );
    this.UserProgress = progressPercentage;
  }
  GetProgressPerCourse(coursesequenceId: number) {
    let courseProgress = this.UserProgress.find(
      (e: any) => e.coursesequenceid === coursesequenceId
    );
    if (courseProgress) {
      return courseProgress.progressPercentage;
    } else {
      return 0;
    }
  }
  isCourseLocked(startDate: string | undefined): boolean {
    if (startDate) {
      const courseStartDate: Date = new Date(startDate);
      return courseStartDate > this.dateNow;
    }

    return false;
  }
}
