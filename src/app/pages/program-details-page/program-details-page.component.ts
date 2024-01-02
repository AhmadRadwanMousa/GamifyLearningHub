import { Component, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { LearnerService } from 'src/app/Services/learner.service';
import { getToken } from 'src/app/constants/token';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-program-details-page',
  templateUrl: './program-details-page.component.html',
  styleUrls: ['./program-details-page.component.scss'],
})
export class ProgramDetailsPageComponent {
  @ViewChild('SectionDialog') SectionDialog: any;
  constructor(
    public shard: SharedService,
    public route: ActivatedRoute,
    public learnerService: LearnerService,
    public dialog: MatDialog
  ) {}
  itemId: number = 0;
  token: any = getToken();
  selectedSection: any;
  sectionsByCourseSequence: any = [];

  ngOnInit() {
    this.route.paramMap.subscribe(
      (param) => (this.itemId = Number(param.get('id')))
    );
    this.shard.getProgramById(this.itemId);
    this.shard.getAllStudentsInProgram(this.itemId);
    this.shard.getAllCoursesInProgram(this.itemId);
  }
  calculateWeeksDuration(): number {
    const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
    const diffInMilliseconds =
      this.formatDate(this.shard.program.educationalperiod.enddate).getTime() -
      this.formatDate(this.shard.program.educationalperiod.startdate).getTime();
    const diffInWeeks = diffInMilliseconds / millisecondsInWeek;

    return Math.floor(diffInWeeks);
  }
  formatDate(dateString: string): Date {
    return new Date(dateString);
  }
  OpenSectionsDialog(programId: number) {
    this.shard
      .getSectionsByCourseSequence(this.shard.FirstCourseSequenceId)
      .subscribe((res) => {
        this.sectionsByCourseSequence = res;
      });

    let dialog = this.dialog.open(this.SectionDialog, {
      width: '400px',
      height: '250px',
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        if (
          this.selectedSection !== undefined &&
          this.selectedSection !== null
        ) {
          this.AddToCart(programId, this.selectedSection);
        }
        this.sectionsByCourseSequence = [];
      }
    });
  }
  AddToCart(programId: any, sectionId: any) {
    let userId = this.token.userId;
    if (userId) {
      let formData = new FormData();
      formData.append('Userid', userId);
      formData.append('Programid', programId);
      formData.append('Sectionid', sectionId);
      this.learnerService.AddCartItem(formData);
    }
  }
}
