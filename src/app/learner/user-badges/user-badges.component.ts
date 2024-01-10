import { Component, OnInit } from '@angular/core';
import { LearnerService } from 'src/app/Services/learner.service';

@Component({
  selector: 'app-user-badges',
  templateUrl: './user-badges.component.html',
  styleUrls: ['./user-badges.component.scss'],
})
export class UserBadgesComponent implements OnInit {
  constructor(public learnerService: LearnerService) {}
  ngOnInit(): void {
    this.learnerService.GetUserBadges();
  }
}
