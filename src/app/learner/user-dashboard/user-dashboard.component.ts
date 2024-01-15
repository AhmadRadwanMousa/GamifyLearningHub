import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { LearnerService } from 'src/app/Services/learner.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {
  constructor(public learnerService: LearnerService){}
  visible: boolean = false;
  numberOfPrograms: number = 0;
  token: string | null = localStorage.getItem('token');
  getUserIdFromToken(): number{
    if(this.token != null){
      let decodedToken: any = jwtDecode(this.token);
      return decodedToken.userId;
    }
    else{
      return 0;
    }
  }
  ngOnInit(){
    this.learnerService.clearCache();
    this.learnerService.UserDashboardInfoByUserId(this.getUserIdFromToken());
    this.learnerService.GetFinishedPrograms(this.getUserIdFromToken());
    setTimeout(() => {
      this.setCount();
    }, 100);
  }
  setCount() {
    this.numberOfPrograms = this.learnerService.finishedPrograms.length;
    this.visible = this.numberOfPrograms > 0 ? true : false;
  }
}
