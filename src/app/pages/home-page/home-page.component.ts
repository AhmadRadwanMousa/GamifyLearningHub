import { Component, OnInit } from '@angular/core';
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
  userPoints: any = [];
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      console.log(isLoggedIn);
      if (isLoggedIn) {
        this.fetchUserPoints();
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
  CloseDialog(userpointsId: number, index: number) {
    console.log(userpointsId);
    this.learnerService.UpdateUserPointsStart(userpointsId);
    this.dialogVisibility[index] = false;
  }
}
