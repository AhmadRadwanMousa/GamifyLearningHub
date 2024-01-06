import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearnerService } from 'src/app/Services/learner.service';

@Component({
  selector: 'app-completed-courses',
  templateUrl: './completed-courses.component.html',
  styleUrls: ['./completed-courses.component.scss']
})
export class CompletedCoursesComponent {
  constructor(public learnerService: LearnerService, public route: ActivatedRoute) {}
  userId: number = 0;
  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.userId = Number(param.get('userid'));
    });
    this.learnerService.CompletedCourses(this.userId);
  }
}
