import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { LearnerService } from 'src/app/Services/learner.service';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss'],
})
export class CourseContentComponent implements OnInit {
  constructor(
    public learnerService: LearnerService,
    private routeValues: ActivatedRoute
  ) {}
  courseSequence: number = 0;
  ngOnInit(): void {
    this.routeValues.paramMap.subscribe((p) => {
      let courseSequenceId = p.get('courseId');
      this.courseSequence = Number(courseSequenceId);
      this.learnerService.GetSectionsByCourseSequenceIdAndUserId(Number(courseSequenceId));
    });
  }
}
