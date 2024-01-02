import { Component, OnInit } from '@angular/core';
import { LearnerService } from 'src/app/Services/learner.service';
import { getToken } from 'src/app/constants/token';

@Component({
  selector: 'app-enrolled-programs',
  templateUrl: './enrolled-programs.component.html',
  styleUrls: ['./enrolled-programs.component.scss'],
})
export class EnrolledProgramsComponent implements OnInit {
  /**
   *
   */
  constructor(public learnerService: LearnerService) {}
  ngOnInit(): void {
    this.learnerService.updateUserId();
    this.learnerService.GetUserPrograms();
  }
}
