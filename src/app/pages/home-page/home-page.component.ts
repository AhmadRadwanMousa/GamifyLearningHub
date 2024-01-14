import { NumberInput } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { flatMap } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { LearnerService } from 'src/app/Services/learner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public learnerService: LearnerService
  ) {}
  dialogVisibility: boolean[] = [];
  badgesDialogVisibility: boolean[] = [];
  userPoints: any = [];
  userBadges: any = [];
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      console.log(isLoggedIn);
      if (isLoggedIn) {
        this.fetchUserPoints();
        this.fetchUserBadges();
      }
    });
  }
  private fetchUserPoints(): void {
    this.learnerService.GetUserPoints().subscribe(
      (res: any) => {
        if (res && res.length > 0) {
          this.userPoints = res;
          this.dialogVisibility = new Array(res.length).fill(true);
        } else {
          console.log('No user points available.');
        }
      },
      (error) => {
        console.error('Error fetching user points:', error);
      }
    );
  }
  private fetchUserBadges(): void {
    this.learnerService.GetUnViewedUserBadges().subscribe(
      (res: any) => {
        if (res && res[0]) {
          this.userBadges = res;
          this.badgesDialogVisibility = new Array(res.length).fill(true);
        } else {
          this.userBadges = [];
          console.log('No user badges available.');
        }
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
  CloseDialog(userpointsId: number, index: number) {
    this.learnerService.UpdateUserPointsStart(userpointsId);
    this.dialogVisibility[index] = false;
  }
  CloseBadgesDialog(
    userbadgeId: number,
    badgeImage: string,
    badgeActivityId: number,
    index: number
  ) {
    this.badgesDialogVisibility[index] = false;
    this.learnerService.UpdateUserBadgeStatue(
      userbadgeId,
      badgeImage,
      badgeActivityId
    );
  }
}
