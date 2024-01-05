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
    this.learnerService.UserDashboardInfoByUserId(this.getUserIdFromToken());
  }
}
